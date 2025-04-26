import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { recipeData } from '~/shared/data/recipeData';
import { allergenFilters } from '~/shared/data/recipeFilters';
import {
    filterByAllergens,
    filterByMeat,
    filterBySideDish,
    filterByTitle,
    filterRecipesByCategory,
} from '~/store/recipeListFilterService/recipeListFilterService';

import { ApplicationState } from './configure-store';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipes: recipeData,
    category: [] as string[],
    currentPageCategories: [] as string[],
    subcategory: '',
    filteredData: recipeData,
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
        setSearchInputValue(state, { payload: searchInputValue }: PayloadAction<string | null>) {
            state.searchInputValue = searchInputValue || '';
        },
        setCurrentPageCategory(state, { payload: searchInputValue }: PayloadAction<string[]>) {
            state.currentPageCategories = searchInputValue || [];
        },
        setCategoriesFilter(
            state,
            { payload }: PayloadAction<{ categories: string[]; subcategory: string }>,
        ) {
            state.category = payload.categories || [];
            state.subcategory = payload.subcategory || '';
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

            if (state.currentPageCategories[0] === undefined) {
                state.category = [];
            } else {
                state.category = [state.currentPageCategories[0]];
            }

            state.subcategory = state.currentPageCategories[1] || '';

            state.isSearchCompleted = false;
            state.searchInputValue = '';
            state.filteredData = filterRecipesByCategory(state.recipes, {
                categories: state.category,
                subcategory: state.subcategory || '',
            });
        },
        setFilteredData: (state) => {
            state.searchError = false;
            console.log(1);

            state.filteredData = filterRecipesByCategory(state.recipes, {
                categories: state.category,
                subcategory: state.subcategory || '',
            });

            state.filteredData = filterByMeat(state.filteredData, state.filters.meatFilters); // для фильтрации по мясу

            state.filteredData = filterBySideDish(
                state.filteredData,
                state.filters.sideDishFilters,
            ); // для фильтра по гарниру

            state.filteredData = filterByTitle(state.filteredData, state.searchInputValue); // для фильтра по гарниру

            if (state.isAllergenFilterOn || state.isSearchAllergenFilterOn) {
                state.filteredData = filterByAllergens(
                    state.filteredData,
                    state.filters.allergens,
                    allergenFilters,
                ); // для фильтрации по аллергенам
            }

            if (state.filteredData.length === 0) {
                state.searchError = true;
            }
            state.isSearchCompleted = true; // для поиска на главной странице
        },
    },
});

export const recipesSelector = (state: ApplicationState) => state.recipesListPage.recipes;
export const filteredDataSelector = (state: ApplicationState) => state.recipesListPage.filteredData;
export const meatFiltersSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.meatFilters;
export const sideDishFiltersSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.sideDishFilters;
export const allergenFilterOnSelector = (state: ApplicationState) =>
    state.recipesListPage.isAllergenFilterOn;
export const allergensSearchFilterOnSelector = (state: ApplicationState) =>
    state.recipesListPage.isSearchAllergenFilterOn;
export const allergensSelector = (state: ApplicationState) =>
    state.recipesListPage.filters.allergens;
export const searchInputSelector = (state: ApplicationState) =>
    state.recipesListPage.searchInputValue;
export const searchCompletedSelector = (state: ApplicationState) =>
    state.recipesListPage.isSearchCompleted;
export const searchErrorSelector = (state: ApplicationState) => state.recipesListPage.searchError;
export const filterCategorySelector = (state: ApplicationState) => state.recipesListPage.category;

export const {
    setRecipesListPageError,
    setRecipesListPageLoader,
    setCurrentPageCategory,
    setCategoriesFilter,
    setFilteredData,
    setMeatFilters,
    setSideDishFilters,
    setSearchInputValue,
    setAllergens,
    setIsAllergenFilterOn,
    setIsSearchAllergenFilterOn,
    setClearFilters,
} = recipesListPageSlice.actions;

export default recipesListPageSlice.reducer;
