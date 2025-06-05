import { jwtDecode } from 'jwt-decode';

import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import {
    AuthSuccessResponse,
    ErrorResponse,
    ForgotPasswordParams,
    jwtDecodedType,
    LoginParams,
    ResetPasswordParams,
    SignUpParams,
    VerifyOtpParams,
} from '~/query/types/types';
import { setAccessToken, setUserId } from '~/store/slices/app-slice';

export const authApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.AUTH],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            signUp: builder.mutation<AuthSuccessResponse, SignUpParams>({
                query: (body) => ({
                    url: ApiEndpoints.SIGNUP,
                    method: METHODS.post,
                    body,
                    apiGroupName: ApiGroupNames.SIGNUP,
                    name: EndpointNames.SIGNUP,
                }),
            }),
            login: builder.mutation<AuthSuccessResponse, LoginParams>({
                query: (body) => ({
                    url: ApiEndpoints.LOGIN,
                    method: METHODS.post,
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

                        const jwtDecoded = jwtDecode(jwtToken) as jwtDecodedType;
                        localStorage.setItem('jwtToken', jwtToken);
                        dispatch(setAccessToken(jwtToken));
                        dispatch(setUserId(jwtDecoded.userId));
                    } catch (error) {
                        console.log(error);
                    }
                },
            }),
            forgotPassword: builder.mutation<AuthSuccessResponse, ForgotPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.FORGOT_PASSWORD,
                    method: METHODS.post,
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.FORGOT_PASSWORD,
                }),
            }),
            verifyOtp: builder.mutation<AuthSuccessResponse, VerifyOtpParams>({
                query: (body) => ({
                    url: ApiEndpoints.VERIFY_OTP,
                    method: METHODS.post,
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.VERIFY_OTP,
                }),
            }),
            resetPassword: builder.mutation<AuthSuccessResponse, ResetPasswordParams>({
                query: (body) => ({
                    url: ApiEndpoints.RESET_PASSWORD,
                    method: METHODS.post,
                    body,
                    apiGroupName: ApiGroupNames.Recovery,
                    name: EndpointNames.RESET_PASSWORD,
                }),
            }),
            checkAuth: builder.query<AuthSuccessResponse, undefined>({
                query: () => ({
                    url: ApiEndpoints.CHECK_AUTH,
                    method: METHODS.get,
                    credentials: 'include',
                }),
            }),
            refreshToken: builder.query<AuthSuccessResponse, void>({
                query: () => ({
                    url: ApiEndpoints.REFRESH_TOKEN,
                    method: METHODS.get,
                    credentials: 'include',
                }),
                async onQueryStarted(_, { queryFulfilled, dispatch }) {
                    try {
                        const { meta } = await queryFulfilled;
                        const jwtToken = meta?.response?.headers.get('Authentication-Access');

                        if (!jwtToken) {
                            throw new Error('нет токена');
                        }

                        const jwtDecoded = jwtDecode(jwtToken) as jwtDecodedType;
                        localStorage.setItem('jwtToken', jwtToken);
                        dispatch(setAccessToken(jwtToken));
                        dispatch(setUserId(jwtDecoded.userId));
                    } catch (error) {
                        const responseError = error as ErrorResponse;
                        if (responseError.status === 403) {
                            dispatch(setUserId('forbidden403'));
                        }
                        console.log(error);
                    }
                },
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
