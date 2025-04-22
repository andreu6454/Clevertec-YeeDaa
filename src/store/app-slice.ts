import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ApplicationState } from './configure-store';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    isBurgerOpen: false,
    isFiltersOpen: false,
    isLogin: false,
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
    },
});
export const userLoadingSelector = (state: ApplicationState) => state.app.isLoading;
export const userErrorSelector = (state: ApplicationState) => state.app.error;
export const isBurgerOpenSelector = (state: ApplicationState) => state.app.isBurgerOpen;
export const isLoginSelector = (state: ApplicationState) => state.app.isLogin;
export const isFiltersOpenSelector = (state: ApplicationState) => state.app.isFiltersOpen;

export const {
    setAppError,
    setAppLoader,
    closeBurgerMenu,
    openBurgerMenu,
    openFilters,
    closeFilters,
} = appSlice.actions;
export default appSlice.reducer;
