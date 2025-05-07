import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

export const useCategoryById = (categoryId: string, subCategoryId: string) => {
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const category = categories.find((c) => c._id === categoryId)?.category;
    const subCategory = subCategories.find((c) => c._id === subCategoryId)?.category;

    return { category, subCategory };
};
