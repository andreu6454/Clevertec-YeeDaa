import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CategoryResponse } from '~/query/types/types';
import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';
import { ApplicationState } from '~/store/configure-store';

const initialState = {
    allCategories: [] as CategoryType[] | SubCategoryType[],
    categories: [] as CategoryType[],
    subCategories: [] as SubCategoryType[],
};
export const categoriesSlice = createSlice({
    name: 'categoriesSlice',
    initialState,
    reducers: {
        setCategories(state, { payload: categories }: PayloadAction<CategoryResponse>) {
            state.allCategories = categories;
            categories.forEach((el) => {
                if ('subCategories' in el) {
                    state.categories.push(el);
                } else {
                    state.subCategories.push(el);
                }
            });
        },
    },
});

export const categoriesSelector = (state: ApplicationState) => state.categoriesSlice.categories;
export const subCategoriesSelector = (state: ApplicationState) =>
    state.categoriesSlice.subCategories;
export const allCategoriesSelector = (state: ApplicationState) =>
    state.categoriesSlice.allCategories;

export const { setCategories } = categoriesSlice.actions;

export default categoriesSlice.reducer;
