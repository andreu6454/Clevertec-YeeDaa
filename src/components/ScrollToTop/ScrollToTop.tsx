import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { useAppDispatch } from '~/store/hooks';
import { setClearFilters, setCurrentPageCategory } from '~/store/recipesListPage-slice';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();
    const { category, subcategory } = useRouteSegments();

    useEffect(() => {
        window.scrollTo(0, 0);
        if (category === undefined) {
            dispatch(setCurrentPageCategory([]));
        } else {
            dispatch(setCurrentPageCategory([category, subcategory]));
        }

        dispatch(setClearFilters());
    }, [pathname, category, subcategory]);

    return null;
};
