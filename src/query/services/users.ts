import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import {
    GetProfileResponse,
    GetStatisticsResponse,
    UpdatePasswordType,
    UpdateProfileType,
    UploadImageResponseType,
} from '~/query/types/types';
import { CreateNoteResponse } from '~/shared/types/bloggersTypes';

export const usersApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.USERS, Tags.NOTES_BY_USERID, Tags.PROFILE_INFO],
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
                providesTags: [Tags.NOTES_BY_USERID, Tags.PROFILE_INFO],
            }),
            getStatistic: builder.query<GetStatisticsResponse, void>({
                query: () => ({
                    url: ApiEndpoints.GET_STATISTIC,
                    method: METHODS.get,
                    apiGroupName: ApiGroupNames.USERS,
                    name: EndpointNames.GET_STATISTIC,
                }),
            }),
            createNote: builder.mutation<CreateNoteResponse, string>({
                query: (note) => ({
                    url: ApiEndpoints.USERS_NOTE,
                    method: METHODS.post,
                    body: {
                        text: note,
                    },
                    name: EndpointNames.CREATE_NOTE,
                }),
                invalidatesTags: [Tags.NOTES_BY_USERID],
            }),
            deleteNote: builder.mutation<{ _id: string }, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.USERS_NOTE}/${id}`,
                    method: METHODS.delete,
                    name: EndpointNames.DELETE_NOTE,
                }),
                invalidatesTags: [Tags.NOTES_BY_USERID],
            }),
            updateInfo: builder.mutation<UpdateProfileType, UpdateProfileType>({
                query: (data) => ({
                    url: ApiEndpoints.UPDATE_PROFILE_INFO,
                    method: METHODS.patch,
                    body: data,
                    name: EndpointNames.UPDATE_INFO,
                }),
                invalidatesTags: [Tags.PROFILE_INFO],
            }),
            updatePassword: builder.mutation<void, UpdatePasswordType>({
                query: (data) => ({
                    url: ApiEndpoints.UPDATE_PASSWORD,
                    method: METHODS.patch,
                    body: data,
                    name: EndpointNames.UPDATE_PASSWORD,
                }),
            }),
            deleteProfile: builder.mutation<void, void>({
                query: () => ({
                    url: ApiEndpoints.PROFILE,
                    method: METHODS.delete,
                    name: EndpointNames.DELETE_PROFILE,
                }),
            }),
            uploadProfilePhoto: builder.mutation<UploadImageResponseType, FormData>({
                query: (formData) => ({
                    url: ApiEndpoints.UPLOAD_PHOTO,
                    method: METHODS.post,
                    body: formData,
                    name: EndpointNames.UPLOAD_PHOTO,
                }),
                invalidatesTags: [Tags.PROFILE_INFO],
            }),
        }),
    });

export const {
    useGetProfileQuery,
    useGetStatisticQuery,
    useCreateNoteMutation,
    useDeleteNoteMutation,
    useUpdateInfoMutation,
    useUpdatePasswordMutation,
    useDeleteProfileMutation,
    useUploadProfilePhotoMutation,
} = usersApi;
