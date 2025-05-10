import { CategoryType, SubCategoryType } from '~/shared/types/categoryTypes';

export const getCategoryById = (
    categories: CategoryType[],
    subCategories: SubCategoryType[],
    subCategoryId: string,
) => {
    const subCategory = subCategories.find((el) => el._id === subCategoryId);

    return categories.find((el) => el._id === subCategory?.rootCategoryId);
};

export const getSubCategoryById = (subCategories: SubCategoryType[], subCategoryId: string) =>
    subCategories.find((el) => el._id === subCategoryId);
