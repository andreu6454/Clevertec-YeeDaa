import { Navigate, Route, Routes } from 'react-router';

import { ErrorPage } from '~/pages/ErrorPage/ErrorPage';
import { JuiciestFoodPage } from '~/pages/JuiciestFoodPage/JuiciestFoodPage';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import RecipePage from '~/pages/RecipePage/RecipePage';
import RecipesListPage from '~/pages/RecipesListPage/RecipesListPage';
import { WithCategoryValidation } from '~/shared/HOC/WithCategoryValidation';

export const AppRouter = () => (
    <Routes>
        <Route index element={<MainPage />} />
        <Route
            path=':category/'
            element={
                <WithCategoryValidation>
                    <RecipesListPage />
                </WithCategoryValidation>
            }
        />
        <Route
            path=':category/:subcategory'
            element={
                <WithCategoryValidation>
                    <RecipesListPage />
                </WithCategoryValidation>
            }
        />
        <Route path=':category/:subcategory/:recipeId' element={<RecipePage />} />
        <Route path='/the-juiciest' element={<JuiciestFoodPage />} />
        <Route path='/login' element={<div>login</div>} />
        <Route path='/not-found' element={<ErrorPage />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
);
