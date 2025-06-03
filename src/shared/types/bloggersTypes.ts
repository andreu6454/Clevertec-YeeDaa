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
