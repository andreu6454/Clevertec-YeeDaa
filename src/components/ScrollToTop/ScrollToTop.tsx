import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import {
    setClearFilters,
    setCurrentPageCategory,
    setCurrentPageSubCategory,
} from '~/store/slices/recipesListPage-slice';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { category, subcategory } = useRouteSegments();

    const allCategories = useAppSelector(categoriesSelector);
    const allSubCategories = useAppSelector(subCategoriesSelector);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (category === undefined) {
            dispatch(setCurrentPageCategory(undefined));
            dispatch(setCurrentPageSubCategory(undefined));
        } else {
            dispatch(setCurrentPageCategory(allCategories.find((el) => el.category === category)));
            dispatch(
                setCurrentPageSubCategory(
                    allSubCategories.find((el) => el.category === subcategory),
                ),
            );
        }

        dispatch(setClearFilters());
    }, [pathname, category, subcategory]);

    return null;
};
