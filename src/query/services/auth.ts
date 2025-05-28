import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import {
    AuthSuccessResponse,
    ForgotPasswordParams,
    LoginParams,
    ResetPasswordParams,
    SignUpParams,
    VerifyOtpParams,
} from '~/query/types/types';
import { setAccessToken } from '~/store/app-slice';

export const authApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            signUp: builder.mutation<AuthSuccessResponse, SignUpParams>({
                query: (body) => ({
                    url: ApiEndpoints.SIGNUP,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.SIGNUP,
                    name: EndpointNames.SIGNUP,
                }),
            }),
            login: builder.mutation<AuthSuccessResponse, LoginParams>({
                query: (body) => ({
                    url: ApiEndpoints.LOGIN,
                    method: 'POST',
                    body,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.LOGIN,
                    name: EndpointNames.LOGIN,
                }),
                async onQueryStarted(_, { queryFulfilled, dispatch }) {
                    try {
                        const { meta } = await queryFulfilled;
                        const jwtToken = meta?.response?.headers.get('Authentication-Access');

                        if (!jwtToken) {
                            throw new Error('нет токена');
                        }

                        localStorage.setItem('jwtToken', jwtToken);
                        dispatch(setAccessToken(jwtToken));
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            forgotPassword: builder.mutation<AuthSuccessResponse, ForgotPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.FORGOT_PASSWORD,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.FORGOT_PASSWORD,
                }),
            }),
            verifyOtp: builder.mutation<AuthSuccessResponse, VerifyOtpParams>({
                query: (body) => ({
                    url: ApiEndpoints.VERIFY_OTP,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.VERIFY_OTP,
                }),
            }),
            resetPassword: builder.mutation<AuthSuccessResponse, ResetPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.RESET_PASSWORD,
                    method: 'POST',
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.RESET_PASSWORD,
                }),
            }),
            checkAuth: builder.query<AuthSuccessResponse, void>({
                query: () => ({
                    url: '/auth/check-auth',
                    method: 'GET',
                    credentials: 'include',
                }),
            }),
            refreshToken: builder.query<AuthSuccessResponse, void>({
                query: () => ({
                    url: '/auth/refresh',
                    method: 'GET',
                    credentials: 'include',
                }),
            }),
        }),
    });

export const {
    useSignUpMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
    useCheckAuthQuery,
    useRefreshTokenQuery,
} = authApi;
