import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { apiSlice } from '~/query/create-api';
import categoriesReducer, { categoriesSlice } from '~/store/categories-slice';
import recipeReducer, { recipeSlice } from '~/store/recipe-slice';
import recipesListPageReducer, { recipesListPageSlice } from '~/store/recipesListPage-slice';

import appReducer, { appSlice } from './app-slice';

const isProduction = false;
const rootReducer = combineReducers({
    [appSlice.name]: appReducer,
    [recipesListPageSlice.name]: recipesListPageReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [categoriesSlice.reducerPath]: categoriesReducer,
    [recipeSlice.reducerPath]: recipeReducer,
});

export type ApplicationState = ReturnType<typeof rootReducer>;
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: !isProduction,
});
