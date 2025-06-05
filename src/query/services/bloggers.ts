import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import {
    BloggerResponse,
    BloggersParams,
    BloggersResponse,
    bloggerSubscriptionParams,
} from '~/query/types/types';
import { setPageTitle } from '~/store/slices/breadcrumbs-slice';

export const bloggersApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.BLOGGERS],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getBloggers: builder.query<BloggersResponse, BloggersParams>({
                query: (params) => ({
                    url: ApiEndpoints.BLOGGERS,
                    method: METHODS.get,
                    params: params,
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGERS,
                }),
                providesTags: [Tags.BLOGGERS],
            }),
            toggleSubscription: builder.mutation<BloggersResponse, bloggerSubscriptionParams>({
                query: ({ bloggerId, userId }) => ({
                    url: ApiEndpoints.BLOGGERS_SUBSCRIPTION,
                    method: METHODS.patch,
                    body: { toUserId: bloggerId, fromUserId: userId },
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.SUBSCRIBE_BLOGGER,
                }),
                invalidatesTags: [Tags.BLOGGERS],
            }),
            getBloggerById: builder.query<BloggerResponse, bloggerSubscriptionParams>({
                query: ({ bloggerId, userId }) => ({
                    url: `${ApiEndpoints.BLOGGERS}/${bloggerId}`,
                    method: METHODS.get,
                    params: { bloggerId: bloggerId, currentUserId: userId },
                    apiGroupName: ApiGroupNames.BLOGGERS,
                    name: EndpointNames.GET_BLOGGER_BY_ID,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        const userFullName = `${data.bloggerInfo.firstName} ${data.bloggerInfo.lastName}`;
                        const userLogin = `(@${data.bloggerInfo.login})`;
                        const title = {
                            _id: data.bloggerInfo._id,
                            title: `${userFullName} ${userLogin}`,
                        };
                        dispatch(setPageTitle(title));
                    } catch {
                        console.log('Response error');
                    }
                },
                providesTags: [Tags.BLOGGERS],
            }),
        }),
    });

export const { useGetBloggersQuery, useToggleSubscriptionMutation, useGetBloggerByIdQuery } =
    bloggersApi;
