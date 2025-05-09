import { ApiEndpoints } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { RecipeParams, RecipeResponse } from '~/query/types/types';
import { Recipe } from '~/shared/types/recipeTypes';
import { setRecipePageTitle } from '~/store/app-slice';
import { setInputLoading, setRecipesData } from '~/store/recipesListPage-slice';

export const recipeApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipeResponse, void>({
                query: () => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getNewestRecipes: builder.query<RecipeResponse, void>({
                query: () => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_LATEST_RECIPES,
                    params: {
                        sortBy: 'createdAt',
                        sortOrder: 'desc',
                        page: 1,
                        limit: 10,
                    },
                }),
            }),
            getRecipeByCategory: builder.query<
                RecipeResponse,
                { subcategoryId: string; limit: number }
            >({
                query: (params) => ({
                    url: `${ApiEndpoints.RECIPES_BY_CATEGORY}${params.subcategoryId}`,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_BY_CATEGORY,
                    params: {
                        limit: params.limit,
                    },
                }),
            }),
            getJuiciestRecipes: builder.query<RecipeResponse, number>({
                query: (page = 1) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_JUICIEST_RECIPES,
                    params: {
                        sortBy: 'likes',
                        sortOrder: 'desc',
                        page: page,
                        limit: 8,
                    },
                }),
            }),
            getJuiciestPageRecipes: builder.query<RecipeResponse, number>({
                query: (page = 1) => ({
                    url: ApiEndpoints.RECIPES,
                    method: 'GET',
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_JUICIEST_RECIPES,
                    params: {
                        sortBy: 'likes',
                        sortOrder: 'desc',
                        page: page,
                        limit: 8,
                    },
                }),
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id) => `/recipe/${id}`,
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        const title = {
                            _id: data._id,
                            title: data.title,
                        };
                        dispatch(setRecipePageTitle(title));
                    } catch {
                        console.log('Response error');
                    }
                },
            }),
            getRecipesWithParams: builder.query<RecipeResponse, RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_WITH_PARAMS,
                    method: 'GET',
                    params: params,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    dispatch(setInputLoading());
                    try {
                        const { data } = await queryFulfilled;
                        console.log(3);
                        dispatch(setRecipesData(data));
                    } catch {
                        console.log('Response error');
                    }
                },
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetNewestRecipesQuery,
    useGetJuiciestRecipesQuery,
    useGetRecipeByCategoryQuery,
    useGetJuiciestPageRecipesQuery,
    useLazyGetRecipesWithParamsQuery,
    useGetRecipesWithParamsQuery,
    useGetRecipeByIdQuery,
} = recipeApi;
