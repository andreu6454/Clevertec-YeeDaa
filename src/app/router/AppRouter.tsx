import { Navigate, Route, Routes } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { ErrorPage } from '~/pages/ErrorPage/ErrorPage';
import { JuiciestFoodPage } from '~/pages/JuiciestFoodPage/JuiciestFoodPage';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import RecipePage from '~/pages/RecipePage/RecipePage';
import { useGetCategoriesQuery } from '~/query/services/categories';
import { setAppError } from '~/store/app-slice';
import { categoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import { createRoutes } from './routeComponents';

export const AppRouter = () => {
    const { isLoading, isError } = useGetCategoriesQuery();

    const categories = useAppSelector(categoriesSelector);
    const dispatch = useAppDispatch();

    if (isLoading) {
        return <FullScreenSpinner />;
    }

    if (isError) {
        dispatch(setAppError('error'));
    }
    return (
        <Routes>
            <Route index element={<MainPage />} />
            {createRoutes({ data: categories })}
            <Route path='/the-juiciest'>
                <Route index element={<JuiciestFoodPage />} />
                <Route path='/the-juiciest/:recipeId' element={<RecipePage />} />
            </Route>
            <Route path='/login' element={<div>login</div>} />
            <Route path='/not-found' element={<ErrorPage />} />
            <Route path='*' element={<Navigate to='/not-found' />} />
        </Routes>
    );
};
