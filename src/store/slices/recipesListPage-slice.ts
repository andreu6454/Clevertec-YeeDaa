import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RecipeResponse } from '~/query/types/types';
import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';

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
    isResultEmpty: false,
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
            if (data.data.length > 0) {
                state.isResultEmpty = false;
                state.recipesData = data;
            } else {
                state.isResultEmpty = true;
            }
            state.isSearchCompleted = true;
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

            state.isResultEmpty = false;
            state.recipesData = {} as RecipeResponse;
            state.isSearchCompleted = false;
            state.searchInputValue = '';
        },
    },
    selectors: {
        meatFiltersSelector: (state) => state.filters.meatFilters,
        sideDishFiltersSelector: (state) => state.filters.sideDishFilters,
        allergensSelector: (state) => state.filters.allergens,
        allergenFilterOnSelector: (state) => state.isAllergenFilterOn,
        searchAllergenFilterOnSelector: (state) => state.isSearchAllergenFilterOn,
        searchInputSelector: (state) => state.searchInputValue,
        searchCompletedSelector: (state) => state.isSearchCompleted,
        searchErrorSelector: (state) => state.searchError,
        subCategoriesIdsSelector: (state) => state.subCategoriesIds,
        categoryIdsSelector: (state) => state.categoryIds,
        recipesDataSelector: (state) => state.recipesData,
        inputLoadingSelector: (state) => state.isInputLoading,
        resultEmptySelector: (state) => state.isResultEmpty,
    },
});

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

export const {
    meatFiltersSelector,
    sideDishFiltersSelector,
    allergensSelector,
    allergenFilterOnSelector,
    searchAllergenFilterOnSelector,
    searchInputSelector,
    searchCompletedSelector,
    searchErrorSelector,
    subCategoriesIdsSelector,
    categoryIdsSelector,
    recipesDataSelector,
    inputLoadingSelector,
    resultEmptySelector,
} = recipesListPageSlice.selectors;

export default recipesListPageSlice.reducer;
