import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Recipe } from '~/shared/types/recipeTypes';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipe: {} as Recipe,
};
export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState,
    reducers: {
        setRecipe(state, { payload: recipe }: PayloadAction<Recipe>) {
            state.recipe = recipe;
        },
    },
    selectors: {
        recipeSelector: (state) => state.recipe,
    },
});

export const { setRecipe } = recipeSlice.actions;

export const { recipeSelector } = recipeSlice.selectors;

export default recipeSlice.reducer;
