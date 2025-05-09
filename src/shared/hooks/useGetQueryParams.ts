import { useMemo } from 'react';

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
    sortBy?: string,
    sortOrder?: 'asc' | 'desc',
): RecipeParams => {
    const allergens = useAppSelector(allergensSelector);
    const searchString = useAppSelector(searchInputSelector);
    const meat = useAppSelector(meatFiltersSelector);
    const garnish = useAppSelector(sideDishFiltersSelector);
    const subcategoriesIds = useAppSelector(subCategoriesIdsSelector);

    return useMemo(() => {
        const queryParams: RecipeParams = {};

        if (page !== undefined) queryParams.page = page;
        if (limit !== undefined) queryParams.limit = limit;
        if (allergens.length) {
            queryParams.allergens = allergens.join(',').replace(/\s/g, '').toLowerCase();
        }
        if (searchString) queryParams.searchString = searchString.toLowerCase();
        if (meat.length) {
            queryParams.meat = meat.join(',').replace(/\s/g, '').toLowerCase();
        }
        if (garnish.length) {
            queryParams.garnish = garnish.join(',').replace(/\s/g, '').toLowerCase();
        }
        if (subcategoriesIds.length) {
            queryParams.subcategoriesIds = subcategoriesIds.join(',');
        }
        if (sortBy) queryParams.sortBy = sortBy;
        if (sortOrder) queryParams.sortOrder = sortOrder;

        return queryParams;
    }, [page, limit, sortBy, sortOrder, allergens, searchString, meat, garnish, subcategoriesIds]);
};
