import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';
import breadcrumbsReducer, { breadcrumbsSlice } from '~/store/slices/breadcrumbs-slice';
import categoriesReducer, { categoriesSlice } from '~/store/slices/categories-slice';
import recipeReducer, { recipeSlice } from '~/store/slices/recipe-slice';
import recipesListPageReducer, { recipesListPageSlice } from '~/store/slices/recipesListPage-slice';

import appReducer, { appSlice } from './slices/app-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipesListPageSlice.name]: recipesListPageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesSlice.reducerPath]: categoriesReducer,
    [recipeSlice.reducerPath]: recipeReducer,
    [breadcrumbsSlice.reducerPath]: breadcrumbsReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
