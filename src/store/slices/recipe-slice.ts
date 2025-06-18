import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DraftType, Recipe } from '~/shared/types/recipeTypes';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipe: {} as Recipe | DraftType,
    draft: {} as DraftType,
};
export const recipeSlice = createSlice({
    name: 'recipeSlice',
    initialState,
    reducers: {
        setRecipe(state, { payload: recipe }: PayloadAction<Recipe | DraftType>) {
            state.recipe = recipe;
        },
        // setDraft(state, { payload: draft }: PayloadAction<DraftType>) {
        //     state.draft = draft;
        // },
    },
    selectors: {
        recipeSelector: (state) => state.recipe,
        // draftSelector: (state) => state.draft,
    },
});

export const { setRecipe } = recipeSlice.actions;

export const { recipeSelector } = recipeSlice.selectors;

export default recipeSlice.reducer;
