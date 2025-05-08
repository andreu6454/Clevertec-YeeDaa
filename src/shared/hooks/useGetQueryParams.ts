import { RecipeParams } from '~/query/types/types';
import { useAppSelector } from '~/store/hooks';
import {
    allergensSelector,
    meatFiltersSelector,
    searchInputSelector,
    sideDishFiltersSelector,
    subCategoriesIdsSelector,
} from '~/store/recipesListPage-slice';

export const useGetQueryParams = (
    page?: number,
    limit?: number,
    sortBy?: 'asc' | 'desc',
    sortOrder?: string,
): RecipeParams => {
    const allergens = useAppSelector(allergensSelector);
    const searchString = useAppSelector(searchInputSelector);
    const meat = useAppSelector(meatFiltersSelector);
    const garnish = useAppSelector(sideDishFiltersSelector);
    const subcategoriesIds = useAppSelector(subCategoriesIdsSelector);

    const queryParams: Record<string, string> = {};

    if (page) queryParams.page = page.toString();
    if (limit) queryParams.limit = limit.toString();
    if (allergens.length > 0)
        queryParams.allergens = allergens.toString().replace(' ', '').toLowerCase();
    if (searchString) queryParams.searchString = searchString.toLowerCase();
    if (meat.length > 0) queryParams.meat = meat.toString().replace(' ', '').toLowerCase();
    if (garnish.length > 0) queryParams.garnish = garnish.toString().replace(' ', '').toLowerCase();
    if (subcategoriesIds.length > 0) queryParams.subcategoriesIds = subcategoriesIds.join(',');
    if (sortBy) queryParams.sortBy = sortBy;
    if (sortOrder) queryParams.sortOrder = sortOrder;

    return queryParams;
};
