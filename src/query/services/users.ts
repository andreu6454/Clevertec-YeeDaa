import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { GetProfileResponse, GetStatisticsResponse } from '~/query/types/types';

export const usersApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.USERS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getProfile: builder.query<GetProfileResponse, void>({
                query: () => ({
                    url: ApiEndpoints.GET_PROFILE,
                    method: METHODS.get,
                    apiGroupName: ApiGroupNames.USERS,
                    name: EndpointNames.GET_PROFILE,
                }),
            }),
            getStatistic: builder.query<GetStatisticsResponse, void>({
                query: () => ({
                    url: ApiEndpoints.GET_STATISTIC,
                    method: METHODS.get,
                    apiGroupName: ApiGroupNames.USERS,
                    name: EndpointNames.GET_STATISTIC,
                }),
            }),
        }),
    });

export const { useGetProfileQuery, useGetStatisticQuery } = usersApi;
