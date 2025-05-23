import { Outlet } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

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
