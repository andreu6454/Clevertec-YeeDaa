import { Outlet } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { useAppDispatch } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';

export const WithCategoriesFetching = () => {
    const { isLoading, isError } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <FullScreenSpinner />;
    }
    if (isError) {
        dispatch(setAppError('error'));
    }
    return <Outlet />;
};
