import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    pageTitle: {
        _id: '',
        title: '',
    },
};
export const breadcrumbsSlice = createSlice({
    name: 'breadCrumbsSlice',
    initialState,
    reducers: {
        setPageTitle(state, { payload: pageTitle }: PayloadAction<{ _id: string; title: string }>) {
            state.pageTitle = pageTitle;
        },
    },
    selectors: {
        recipeSelector: (state) => state,
        pageTitleSelector: (state) => state.pageTitle,
    },
});

export const { setPageTitle } = breadcrumbsSlice.actions;

export const { pageTitleSelector } = breadcrumbsSlice.selectors;

export default breadcrumbsSlice.reducer;
