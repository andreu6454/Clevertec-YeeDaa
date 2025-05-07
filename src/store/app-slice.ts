import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    isBurgerOpen: false,
    isFiltersOpen: false,
    isLogin: false,
    pageTitle: {
        _id: '',
        title: '',
    },
};
export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setAppLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        openBurgerMenu(state: AppState) {
            state.isBurgerOpen = true;
        },
        closeBurgerMenu(state: AppState) {
            state.isBurgerOpen = false;
        },
        openFilters(state: AppState) {
            state.isFiltersOpen = true;
        },
        closeFilters(state: AppState) {
            state.isFiltersOpen = false;
        },
        setRecipePageTitle(
            state: AppState,
            { payload: pageTitle }: PayloadAction<{ _id: string; title: string }>,
        ) {
            state.pageTitle = pageTitle;
        },
    },
});
export const appLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const appErrorSelector = (state: ApplicationState) => state.app.error;
export const isBurgerOpenSelector = (state: ApplicationState) => state.app.isBurgerOpen;
export const isLoginSelector = (state: ApplicationState) => state.app.isLogin;
export const isFiltersOpenSelector = (state: ApplicationState) => state.app.isFiltersOpen;
export const recipePageTitleSelector = (state: ApplicationState) => state.app.pageTitle;

export const {
    setAppError,
    setAppLoader,
    closeBurgerMenu,
    openBurgerMenu,
    openFilters,
    closeFilters,
    setRecipePageTitle,
} = appSlice.actions;
export default appSlice.reducer;
