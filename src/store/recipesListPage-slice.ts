import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { recipeData } from '~/shared/data/recipeData';

import { ApplicationState } from './configure-store';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipes: recipeData,
    filteredData: recipeData,
};
export const recipesListPageSlice = createSlice({
    name: 'recipesListPage',
    initialState,
    reducers: {
        setRecipesListPageError(state, { payload: error }: PayloadAction<string | null>) {
            state.error = error;
        },
        setRecipesListPageLoader(state, { payload: isLoading }: PayloadAction<boolean>) {
            state.isLoading = isLoading;
        },
        setFilteredData: (
            state,
            action: PayloadAction<{
                category: string;
                subcategory: string;
            }>,
        ) => {
            const { category, subcategory } = action.payload;

            state.filteredData = state.recipes.filter(
                (recipe) =>
                    recipe.category.includes(category) && recipe.subcategory.includes(subcategory),
            );
        },
    },
});

export const recipesSelector = (state: ApplicationState) => state.recipesListPage.recipes;
export const filteredDataSelector = (state: ApplicationState) => state.recipesListPage.filteredData;

export const { setRecipesListPageError, setRecipesListPageLoader, setFilteredData } =
    recipesListPageSlice.actions;

export default recipesListPageSlice.reducer;
