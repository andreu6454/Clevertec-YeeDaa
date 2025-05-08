import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';
import { Recipe } from '~/shared/types/recipeTypes';

export type Meta = {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
};

export type RecipeResponse = {
    data: Recipe[];
    meta: Meta;
};

export type RecipeParams = {
    page?: number;
    limit?: number;
    allergens?: string;
    searchString?: string;
    meat?: string;
    garnish?: string;
    subcategoriesIds?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
};

export type CategoryResponse = CategoryType[] | SubCategoryType[];
