import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    isBurgerOpen: false,
    isFiltersOpen: false,
    isLogin: false,
    emailVerified: null as boolean | null,
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
        setEmailVerification(state, { payload: isVerified }: PayloadAction<boolean>) {
            state.emailVerified = isVerified;
        },
        setIsLogin(state, { payload: isLogin }: PayloadAction<boolean>) {
            state.isLogin = isLogin;
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
    selectors: {
        appErrorSelector: (state) => state.error,
        isBurgerOpenSelector: (state) => state.isBurgerOpen,
        isLoginSelector: (state) => state.isLogin,
        isFiltersOpenSelector: (state) => state.isFiltersOpen,
        recipePageTitleSelector: (state) => state.pageTitle,
        emailVerifiedSelector: (state) => state.emailVerified,
    },
});

export const {
    setAppError,
    setAppLoader,
    setEmailVerification,
    setIsLogin,
    closeBurgerMenu,
    openBurgerMenu,
    openFilters,
    closeFilters,
    setRecipePageTitle,
} = appSlice.actions;

export const {
    appErrorSelector,
    isBurgerOpenSelector,
    isLoginSelector,
    isFiltersOpenSelector,
    recipePageTitleSelector,
    emailVerifiedSelector,
} = appSlice.selectors;

export default appSlice.reducer;
