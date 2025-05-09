import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeResponse } from '~/query/types/types';
import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';

import { ApplicationState } from './configure-store';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipesData: {} as RecipeResponse,
    isInputLoading: false,
    currentPageCategory: {} as CategoryType,
    currentPageSubCategory: {} as SubCategoryType,
    categoryIds: [] as string[],
    subCategoriesIds: [] as string[],
    isAllergenFilterOn: false,
    isSearchAllergenFilterOn: false,
    searchInputValue: '',
    searchError: false,
    isSearchCompleted: false,
    filters: {
        meatFilters: [] as string[],
        sideDishFilters: [] as string[],
        allergens: [] as string[],
    },
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
        setRecipesData(state, { payload: data }: PayloadAction<RecipeResponse>) {
            state.recipesData = data;
            state.isInputLoading = false;
        },
        setInputLoading(state) {
            state.isInputLoading = true;
        },
        setSearchInputValue(state, { payload: searchInputValue }: PayloadAction<string | null>) {
            state.searchInputValue = searchInputValue || '';
        },
        setCurrentPageCategory(
            state,
            { payload: category }: PayloadAction<CategoryType | undefined>,
        ) {
            if (category) {
                state.currentPageCategory = category;
            }
        },
        setCurrentPageSubCategory(
            state,
            { payload: subCategory }: PayloadAction<SubCategoryType | undefined>,
        ) {
            if (subCategory) {
                state.currentPageSubCategory = subCategory;
            }
        },
        setCurrentPageCategories(state) {
            if (state.currentPageCategory.title) {
                state.categoryIds = [state.currentPageCategory.subCategories[0].rootCategoryId];
                state.subCategoriesIds = [];
                for (const subCategory of state.currentPageCategory.subCategories) {
                    state.subCategoriesIds.push(subCategory._id);
                }
            } else {
                state.categoryIds = [];
                state.subCategoriesIds = [];
            }
        },
        setCategoriesFilter(
            state,
            { payload }: PayloadAction<{ categories: string[]; subcategory: string[] }>,
        ) {
            state.categoryIds = payload.categories;
            state.subCategoriesIds = payload.subcategory;
            state.isSearchCompleted = false;
        },
        setMeatFilters(state, { payload: meatFilters }: PayloadAction<string[]>) {
            state.filters.meatFilters = meatFilters;
        },
        setSideDishFilters(state, { payload: sideDishFilters }: PayloadAction<string[]>) {
            state.filters.sideDishFilters = sideDishFilters;
        },
        setIsAllergenFilterOn(state) {
            if (state.isAllergenFilterOn) {
                state.filters.allergens = [];
            }
            state.isAllergenFilterOn = !state.isAllergenFilterOn;
        },
        setIsSearchAllergenFilterOn(state) {
            if (state.isSearchAllergenFilterOn) {
                state.filters.allergens = [];
            }
            state.isSearchAllergenFilterOn = !state.isSearchAllergenFilterOn;
        },
        setAllergens(state, { payload: allergens }: PayloadAction<string[]>) {
            state.filters.allergens = allergens;
        },
        setClearFilters(state) {
            state.filters = {
                meatFilters: [],
                sideDishFilters: [],
                allergens: [],
            };

            state.recipesData = {} as RecipeResponse;
            state.isSearchCompleted = false;
            state.searchInputValue = '';
        },
    },
});

export const meatFiltersSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.meatFilters;
export const sideDishFiltersSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.sideDishFilters;
export const allergenFilterOnSelector = (state: ApplicationState) =>
    state.recipesListPage.isAllergenFilterOn;
export const searchAllergenFilterOnSelector = (state: ApplicationState) =>
    state.recipesListPage.isSearchAllergenFilterOn;
export const allergensSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.allergens;
export const searchInputSelector = (state: ApplicationState) =>
    state.recipesListPage.searchInputValue;
export const searchCompletedSelector = (state: ApplicationState) =>
    state.recipesListPage.isSearchCompleted;
export const searchErrorSelector = (state: ApplicationState) => state.recipesListPage.searchError;
export const subCategoriesIdsSelector = (state: ApplicationState) =>
    state.recipesListPage.subCategoriesIds;
export const categoryIdsSelector = (state: ApplicationState) => state.recipesListPage.categoryIds;
export const recipesDataSelector = (state: ApplicationState) => state.recipesListPage.recipesData;
export const inputLoadingSelector = (state: ApplicationState) =>
    state.recipesListPage.isInputLoading;
export const currentPageSubCategorySelector = (state: ApplicationState) =>
    state.recipesListPage.currentPageSubCategory;

export const {
    setRecipesListPageError,
    setRecipesListPageLoader,
    setInputLoading,
    setRecipesData,
    setCurrentPageCategory,
    setCurrentPageSubCategory,
    setCurrentPageCategories,
    setIsSearchAllergenFilterOn,
    setCategoriesFilter,
    setMeatFilters,
    setSideDishFilters,
    setSearchInputValue,
    setAllergens,
    setIsAllergenFilterOn,
    setClearFilters,
} = recipesListPageSlice.actions;

export default recipesListPageSlice.reducer;
