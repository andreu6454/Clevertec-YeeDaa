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
            getRecipes: builder.query<RecipeResponse, RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    method: 'GET',
                    params: params,
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
    useGetRecipeByCategoryQuery,
    useLazyGetRecipesWithParamsQuery,
    useGetRecipeByIdQuery,
} = recipeApi;
