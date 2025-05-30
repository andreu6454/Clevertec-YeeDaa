import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppState = typeof initialState;

const initialState = {
    isLoading: false,
    error: '' as string | null,
    isBurgerOpen: false,
    isFiltersOpen: false,
    emailVerified: null as boolean | null,
    token: '',
    userId: '',
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
        setUserId(state, { payload: userId }: PayloadAction<string>) {
            state.userId = userId;
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
        setAccessToken(state: AppState, { payload: token }: PayloadAction<string>) {
            state.token = token;
        },
    },
    selectors: {
        appErrorSelector: (state) => state.error,
        isBurgerOpenSelector: (state) => state.isBurgerOpen,
        userIdSelector: (state) => state.userId,
        isFiltersOpenSelector: (state) => state.isFiltersOpen,
        recipePageTitleSelector: (state) => state.pageTitle,
        emailVerifiedSelector: (state) => state.emailVerified,
    },
});

export const {
    setAppError,
    setAppLoader,
    setEmailVerification,
    setUserId,
    closeBurgerMenu,
    openBurgerMenu,
    openFilters,
    closeFilters,
    setAccessToken,
    setRecipePageTitle,
} = appSlice.actions;

export const {
    appErrorSelector,
    isBurgerOpenSelector,
    userIdSelector,
    isFiltersOpenSelector,
    recipePageTitleSelector,
    emailVerifiedSelector,
} = appSlice.selectors;

export default appSlice.reducer;
