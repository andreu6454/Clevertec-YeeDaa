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
                    apiGroupName: ApiGroupNames.LOGIN,
                    name: EndpointNames.LOGIN,
                }),
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
        }),
    });

export const {
    useSignUpMutation,
    useLoginMutation,
    useForgotPasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation,
} = authApi;
