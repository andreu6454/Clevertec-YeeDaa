import { ReactNode } from 'react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

type WithDataFetchingProps = {
    children: ReactNode;
};

export const WithDataFetching = (props: WithDataFetchingProps) => {
    const { children } = props;
    const { isLoading, isError } = useGetCategoriesQuery();
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <FullScreenSpinner />;
    }
    if (isError) {
        dispatch(setAppError('error'));
    }
    return children;
};
