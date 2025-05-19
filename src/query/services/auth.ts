import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { AuthSuccessResponse, LoginParams, SignUpParams } from '~/query/types/types';

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
        }),
    });

export const { useSignUpMutation, useLoginMutation } = authApi;
