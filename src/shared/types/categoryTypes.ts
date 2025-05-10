export type CategoryType = {
    _id: string;
    title: string;
    description: string;
    category: string;
    icon: string;
    subCategories: SubCategoryType[];
};

export type SubCategoryType = {
    _id: string;
    title: string;
    category: string;
    rootCategoryId: string;
};
