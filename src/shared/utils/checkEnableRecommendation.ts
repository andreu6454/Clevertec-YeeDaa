export const checkEnableRecommendation = (subscribers: number, bookmarks: number) =>
    subscribers > 100 && bookmarks > 200;
