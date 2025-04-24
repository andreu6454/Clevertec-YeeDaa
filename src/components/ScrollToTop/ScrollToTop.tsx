import { useEffect } from 'react';
import { useLocation } from 'react-router';

import { useAppDispatch } from '~/store/hooks';
import { setClearFilters } from '~/store/recipesListPage-slice';

export const ScrollToTop = () => {
    const { pathname } = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
        dispatch(setClearFilters());
    }, [pathname]);

    return null;
};
