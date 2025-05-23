import { Navigate, Outlet } from 'react-router';

import { APP_PATHS } from '~/shared/constants/pathes';
import { isLoginSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export const WithAuthValidation = () => {
    const isAuthenticated = useAppSelector(isLoginSelector);

    if (!isAuthenticated) {
        return <Navigate to={APP_PATHS.login} replace />;
    }

    return <Outlet />;
};
