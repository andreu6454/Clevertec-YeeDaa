import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { recipeData } from '~/shared/data/recipeData';

import { ApplicationState } from './configure-store';

const initialState = {
    isLoading: false,
    error: '' as string | null,
    recipes: recipeData,
    category: '',
    subcategory: '',
    filteredData: recipeData,
    isAllergenFilterOn: false,
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
        setCategoriesFilter(state, { payload: categories }: PayloadAction<string[]>) {
            state.category = categories[0];
            state.subcategory = categories[1];
            state.isSearchCompleted = false;
        },
        setMeatFilters(state, { payload: meatFilters }: PayloadAction<string[]>) {
            state.filters.meatFilters = meatFilters;
        },
        setSideDishFilters(state, { payload: sideDishFilters }: PayloadAction<string[]>) {
            state.filters.sideDishFilters = sideDishFilters;
        },
        setIsAllergenFilterOn(state) {
            state.isAllergenFilterOn = !state.isAllergenFilterOn;
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
            state.isSearchCompleted = false;
            state.searchInputValue = '';
            state.filteredData = state.recipes.filter(
                (recipe) =>
                    recipe.category.includes(state.category) &&
                    recipe.subcategory.includes(state.subcategory),
            );
        },
        setFilteredData: (state) => {
            state.searchError = false;

            if (state.subcategory.length > 0) {
                state.filteredData = state.recipes.filter(
                    (recipe) =>
                        recipe.category.includes(state.category) &&
                        recipe.subcategory.includes(state.subcategory),
                ); //для фильтра на recipeListPage по категории и саб категории
            } else if (state.category.length > 0) {
                state.filteredData = state.recipes.filter((recipe) =>
                    recipe.category.includes(state.category),
                ); // для фильтра только по категории
            }

            if (state.subcategory.length === 0 && state.category.length === 0) {
                state.filteredData = state.recipes;
            } // для поиска на главной странице

            if (state.filters.meatFilters.length > 0) {
                state.filteredData = state.filteredData.filter((recipe) =>
                    state.filters.meatFilters.some((filter) => recipe.meat.includes(filter)),
                ); // для фильтра по мясу
            }

            if (state.filters.sideDishFilters.length > 0) {
                state.filteredData = state.filteredData.filter((recipe) =>
                    state.filters.sideDishFilters.some((filter) => recipe.side.includes(filter)),
                ); // для фильтра по гарниру
            }

            if (state.searchInputValue.length > 0) {
                state.filteredData = state.filteredData.filter((recipe) =>
                    recipe.title.toLowerCase().includes(state.searchInputValue.toLowerCase()),
                ); // для поиска по тайтлу
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
export const searchInputSelector = (state: ApplicationState) =>
    state.recipesListPage.searchInputValue;
export const searchCompletedSelector = (state: ApplicationState) =>
    state.recipesListPage.isSearchCompleted;
export const searchErrorSelector = (state: ApplicationState) => state.recipesListPage.searchError;

export const {
    setRecipesListPageError,
    setRecipesListPageLoader,
    setCategoriesFilter,
    setFilteredData,
    setMeatFilters,
    setSideDishFilters,
    setSearchInputValue,
    setAllergens,
    setIsAllergenFilterOn,
    setClearFilters,
} = recipesListPageSlice.actions;

export default recipesListPageSlice.reducer;
