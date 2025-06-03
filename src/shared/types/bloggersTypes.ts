import { NullableNewRecipesDataType } from '~/shared/types/recipeTypes';

export type BloggerNoteType = {
    date: string;
    text: string;
};

export type BloggerType = {
    _id: string;
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    bookmarksCount: number;
    isFavorite: boolean;
    notes: BloggerNoteType[];
    newRecipesCount: number;
};

export type BloggerInfoType = {
    _id: string;
    drafts: NullableNewRecipesDataType[];
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes: BloggerNoteType[];
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
};
