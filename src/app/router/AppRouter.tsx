import { Navigate, Route, Routes } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { ErrorPage } from '~/pages/ErrorPage/ErrorPage';
import { JuiciestFood } from '~/pages/JuiciestFood/JuiciestFood';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import RecipePage from '~/pages/RecipePage/RecipePage';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { categoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

import { createRoutes } from './routeComponents';

export const AppRouter = () => {
    const { isLoading } = useGetCategoriesQuery();

    const categories = useAppSelector(categoriesSelector);

    if (isLoading) {
        return <FullScreenSpinner />;
    }

    return (
        <Routes>
            <Route index element={<MainPage />} />
            {createRoutes({ data: categories })}
            <Route path='/the-juiciest'>
                <Route index element={<JuiciestFood />} />
                <Route path='/the-juiciest/:recipeId' element={<RecipePage />} />
            </Route>
            <Route path='/login' element={<div>login</div>} />
            <Route path='/not-found' element={<ErrorPage />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
    );
};
