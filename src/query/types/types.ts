import { BloggerInfoType, BloggerNoteType, BloggerType } from '~/shared/types/bloggersTypes';
import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';
import { NullableNewRecipesDataType, Recipe } from '~/shared/types/recipeTypes';

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

export type ForgotPasswordParams = {
    email: string;
};

export type VerifyOtpParams = {
    email: string;
    otpToken: string;
};
export type ResetPasswordParams = {
    login: string;
    password: string;
    passwordConfirm: string;
    email: string;
};

export type ImageUploadResponse = {
    name: string;
    url: string;
    _id: string;
};

export type MeasureUnit = {
    _id: string;
    name: string;
};

export type MeasureUnitsResponse = MeasureUnit[];

export type jwtDecodedType = {
    userId: string;
    login: string;
    exp: number;
    iat: number;
};

export type UpdateRecipeParams = { id: string; recipe: NullableNewRecipesDataType };

export type BloggersParams = {
    limit: string;
    currentUserId: string;
};

export type BloggersResponse = {
    favorites: BloggerType[];
    others: BloggerType[];
};

export type BloggerResponse = {
    bloggerInfo: BloggerInfoType;
    isFavorite: boolean;
    totalBookmarks: number;
    totalSubscribers: number;
};

export type bloggerSubscriptionParams = { bloggerId: string; userId: string };

export type UserRecipesResponse = {
    notes: BloggerNoteType;
    recipes: Recipe[];
    totalBookmarks: number;
    totalSubscribers: number;
    userId: string;
};
