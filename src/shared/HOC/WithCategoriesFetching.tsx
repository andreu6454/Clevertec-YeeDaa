import { Outlet } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useAppDispatch } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';

export const WithCategoriesFetching = () => {
    // const categories = useAppSelector(allCategoriesSelector);
    const dispatch = useAppDispatch();

    // const categoriesLocalStorage = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEYS.categories) || 'null');

    const { isLoading, isError } = useGetCategoriesQuery();

    // if (categoriesLocalStorage ) {
    //     dispatch(setCategories(categories));
    //     return <Outlet/>;
    // }

    if (isLoading) {
        return <FullScreenSpinner />;
    }
    if (isError) {
        dispatch(setAppError('error'));
    }
    return <Outlet />;
};
