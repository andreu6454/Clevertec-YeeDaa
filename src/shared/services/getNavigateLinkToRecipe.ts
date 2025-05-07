import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';

export const getNavigateLinkToRecipe = (
    categories: CategoryType[],
    subCategories: SubCategoryType[],
    subCategoryId: string,
    recipeId: string,
) => {
    const subCategory = subCategories.find((el) => el._id === subCategoryId);
    const category = categories.find((el) => el._id === subCategory?.rootCategoryId);
    return `/${category?.category}/${subCategory?.category}/${recipeId}`;
};
