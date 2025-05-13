import { Navigate, Outlet } from 'react-router';

export const WithAuthValidation = () => {
    const isAuthenticated = true;

    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    return <Outlet />;
};
