import { Navigate, Outlet } from 'react-router';

import { isLoginSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

export const WithAuthValidation = () => {
    const isAuthenticated = useAppSelector(isLoginSelector);

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
};
