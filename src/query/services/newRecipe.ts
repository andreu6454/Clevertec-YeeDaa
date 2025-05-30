import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { ImageUploadResponse, MeasureUnitsResponse } from '~/query/types/types';
import { NullableNewRecipesDataType, Recipe } from '~/shared/types/recipeTypes';

export const newRecipeApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.NEW_RECIPES, Tags.RECIPES],
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
            createRecipe: builder.mutation<Recipe, NullableNewRecipesDataType>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'POST',
                    body,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_RECIPE,
                }),
            }),
            createDraft: builder.mutation<Recipe, NullableNewRecipesDataType>({
                query: (body) => ({
                    url: ApiEndpoints.RECIPE_DRAFT,
                    method: 'POST',
                    body,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.CREATE_DRAFT,
                }),
            }),
            getMeasureUnits: builder.query<MeasureUnitsResponse, void>({
                query: () => ({
                    url: ApiEndpoints.MEASURE_UNITS,
                    method: 'get',
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.MEASURE_UNITS,
                }),
            }),
        }),
    });

export const {
    useUploadImageMutation,
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useCreateDraftMutation,
} = newRecipeApi;
