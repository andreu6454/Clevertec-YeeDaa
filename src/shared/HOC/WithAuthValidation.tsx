import { jwtDecode } from 'jwt-decode';
import { Navigate, Outlet } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useRefreshTokenQuery } from '~/query/services/auth';
import { jwtDecodedType } from '~/query/types/types';
import { LOCAL_STORAGE_KEYS } from '~/shared/constants/localStorage';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setUserId, userIdSelector } from '~/store/slices/app-slice';

export const WithAuthValidation = () => {
    const userId = useAppSelector(userIdSelector);

    const dispatch = useAppDispatch();
    const jwtToken = localStorage.getItem(LOCAL_STORAGE_KEYS.jwtToken);

    if (jwtToken && !userId) {
        const jwtDecoded = jwtDecode(jwtToken) as jwtDecodedType;
        dispatch(setUserId(jwtDecoded.userId));
    }

    const { isLoading: refreshTokenLoading } = useRefreshTokenQuery();

    if (userId === 'forbidden403') {
        return <Navigate to={APP_PATHS.login} replace />;
    }

    if (!userId && !refreshTokenLoading) {
        return <Navigate to={APP_PATHS.login} replace />;
    }

    if (userId && !refreshTokenLoading) {
        return <Outlet />;
    }

    return <FullScreenSpinner />;
};
