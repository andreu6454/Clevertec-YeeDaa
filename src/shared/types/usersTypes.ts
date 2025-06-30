import { NoteType } from '~/shared/types/bloggersTypes';
import { DraftType } from '~/shared/types/recipeTypes';

export type ReactionType = {
    date: string;
    count: number;
};

export type ProfileType = {
    photoLink: string;
    drafts: DraftType[];
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    notes: NoteType[];
    recipesIds: string[];
    subscribers: string[];
    subscriptions: string[];
    _id: string;
};

export type UserType = {
    firstName: string;
    id: string;
    lastName: string;
    login: string;
    photo: string;
};
