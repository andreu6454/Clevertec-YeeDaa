import { useMemo } from 'react';
import { useLocation } from 'react-router';

export const useRouteSegments = () => {
    const { pathname } = useLocation();
    const segments = useMemo(() => pathname.split('/').filter(Boolean), [pathname]);

    return {
        category: segments[0],
        subcategory: segments[1],
    };
};
