import { ApiEndpoints, METHODS } from '~/query/constants/api';
import { ApiGroupNames } from '~/query/constants/api-group-names';
import { EndpointNames } from '~/query/constants/endpoint-names';
import { Tags } from '~/query/constants/tags';
import { apiSlice } from '~/query/create-api';
import { CategoryResponse } from '~/query/types/types';
import { LOCAL_STORAGE_KEYS } from '~/shared/constants/localStorage';
import { setAppError } from '~/store/slices/app-slice';
import { setCategories } from '~/store/slices/categories-slice';

export const categoriesApi = apiSlice
    .enhanceEndpoints({
        addTagTypes: [Tags.CATEGORIES],
    })
    .injectEndpoints({
        endpoints: (builder) => ({
            getCategories: builder.query<CategoryResponse, void>({
                query: () => ({
                    url: ApiEndpoints.CATEGORIES,
                    method: METHODS.get,
                    apiGroupName: ApiGroupNames.CATEGORIES,
                    name: EndpointNames.GET_CATEGORIES,
                }),
                async onQueryStarted(_args, { dispatch, queryFulfilled }) {
                    try {
                        const { data } = await queryFulfilled;
                        dispatch(setCategories(data));
                        localStorage.setItem(LOCAL_STORAGE_KEYS.categories, JSON.stringify(data));
                    } catch {
                        dispatch(setAppError('categoriesError'));
                        console.log('Categories response error');
                    }
                },
                providesTags: [Tags.CATEGORIES],
            }),
        }),
    });

export const { useGetCategoriesQuery } = categoriesApi;
