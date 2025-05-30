import { skipToken } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router';

import { useCheckAuthQuery, useRefreshTokenQuery } from '~/query/services/auth';
import { APP_PATHS } from '~/shared/constants/pathes';
import { userIdSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export const WithAuthValidation = () => {
    const userId = useAppSelector(userIdSelector);

    const [shouldRefresh, setShouldRefresh] = useState(false);

    const { data, isLoading: checkAuthLoading } = useCheckAuthQuery();
    const { isLoading: refreshLoading } = useRefreshTokenQuery(
        shouldRefresh ? undefined : skipToken,
    );

    useEffect(() => {
        if (checkAuthResult) setShouldRefresh(true);
    }, [data?.statusText]);

    const checkAuthResult = data?.statusText === 'Успех!';

    const isLoading = checkAuthLoading || refreshLoading;

    if (!userId && !isLoading) {
        return <Navigate to={APP_PATHS.login} replace />;
    }

    return <Outlet />;
};
