import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { RecipeParams, RecipeResponse, UserRecipesResponse } from '~/query/types/types';
import { BookmarkResponseType, Recipe } from '~/shared/types/recipeTypes';
import { setPageTitle } from '~/store/slices/breadcrumbs-slice';
import { setRecipe } from '~/store/slices/recipe-slice';
import { setInputLoading, setRecipesData } from '~/store/slices/recipesListPage-slice';

export const recipeApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.RECIPES, Tags.RECIPE_BY_ID, Tags.RECIPES_BY_USERID],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getRecipes: builder.query<RecipeResponse, RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES,
                    method: METHODS.get,
                    params: params,
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipeByCategory: builder.query<
                RecipeResponse,
                { subcategoryId: string; limit: number }
            >({
                query: (params) => ({
                    url: `${ApiEndpoints.RECIPES_BY_CATEGORY}${params.subcategoryId}`,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_BY_CATEGORY,
                    method: METHODS.get,
                    params: {
                        limit: params.limit,
                    },
                }),
                providesTags: [Tags.RECIPES],
            }),
            getRecipeById: builder.query<Recipe, string>({
                query: (id) => ({
                    url: `${ApiEndpoints.RECIPES}/${id}`,
                    method: METHODS.get,
                }),
                async onQueryStarted(_arg, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        const title = {
                            _id: data._id,
                            title: data.title,
                        };
                        dispatch(setPageTitle(title));
                        dispatch(setRecipe(data));
                    } catch {
                        console.log('Response error');
                    }
                },
                providesTags: [Tags.RECIPE_BY_ID],
            }),
            getRecipesWithParams: builder.query<RecipeResponse, RecipeParams>({
                query: (params) => ({
                    url: ApiEndpoints.RECIPES,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_RECIPES_WITH_PARAMS,
                    method: METHODS.get,
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
                providesTags: [Tags.RECIPES],
            }),
            likeRecipe: builder.mutation<Recipe, string>({
                query: (id) => ({
                    url: ApiEndpoints.RECIPES + `/${id}` + ApiEndpoints.LIKE,
                    method: METHODS.post,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                }),
                invalidatesTags: [Tags.RECIPES, Tags.RECIPE_BY_ID],
            }),
            bookmarkRecipe: builder.mutation<BookmarkResponseType, string>({
                query: (id) => ({
                    url: ApiEndpoints.RECIPES + `/${id}` + ApiEndpoints.BOOKMARK,
                    method: METHODS.post,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                }),
                invalidatesTags: [Tags.RECIPES, Tags.RECIPE_BY_ID],
            }),
            getUserRecipesById: builder.query<UserRecipesResponse, string>({
                query: (id) => ({
                    url: ApiEndpoints.USER_RECIPES + id,
                    apiGroupName: ApiGroupNames.RECIPES,
                    name: EndpointNames.GET_USER_RECIPES,
                    method: METHODS.get,
                }),
                providesTags: [Tags.RECIPES_BY_USERID],
            }),
            recommendRecipe: builder.mutation<void, string>({
                query: (id) => ({
                    url: ApiEndpoints.RECOMMEND_RECIPE + id,
                    method: METHODS.post,
                    credentials: 'include',
                    apiGroupName: ApiGroupNames.RECIPES,
                }),
                invalidatesTags: [Tags.RECIPE_BY_ID],
            }),
        }),
    });

export const {
    useGetRecipesQuery,
    useGetRecipeByCategoryQuery,
    useLazyGetRecipesWithParamsQuery,
    useGetRecipeByIdQuery,
    useBookmarkRecipeMutation,
    useLikeRecipeMutation,
    useGetUserRecipesByIdQuery,
    useRecommendRecipeMutation,
} = recipeApi;
