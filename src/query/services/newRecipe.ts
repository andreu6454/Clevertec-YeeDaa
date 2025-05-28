import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { ImageUploadResponse } from '~/query/types/types';

export const newRecipeApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.NEW_RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            uploadImage: builder.mutation<ImageUploadResponse, FormData>({
                query: (formData) => ({
                    url: ApiEndpoints.UPLOAD_IMAGE,
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                }),
            }),
            createRecipe: builder.mutation<string, NewRecipeDataType>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'POST',
                    body,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE,
                }),
            }),
        }),
    });

export const { useUploadImageMutation, useCreateRecipeMutation } = newRecipeApi;
