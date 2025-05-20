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

export type SignUpParams = {
    email: string;
    login: string;
    password: string;
    firstName: string;
    lastName: string;
};

export type AuthSuccessResponse = {
    statusText: string;
    message: string;
};

export type ErrorResponse = {
    data: {
        message: string;
        error?: string;
        statusCode: number;
    };
    status: number;
};

export type LoginParams = {
    login: string;
    password: string;
};
export type CategoryResponse = CategoryType[] | SubCategoryType[];
