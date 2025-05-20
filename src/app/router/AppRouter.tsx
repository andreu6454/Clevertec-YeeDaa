import { Navigate, Route, Routes } from 'react-router';

import { ErrorPage } from '~/pages/ErrorPage/ErrorPage';
import { JuiciestFoodPage } from '~/pages/JuiciestFoodPage/JuiciestFoodPage';
import { LoginPage } from '~/pages/LoginPage/LoginPage';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import RecipePage from '~/pages/RecipePage/RecipePage';
import RecipesListPage from '~/pages/RecipesListPage/RecipesListPage';
import { RegistrationPage } from '~/pages/RegistrationPage/RegistrationPage';
import { VerificationPage } from '~/pages/VerificationPage/VerificationPage';
import { WithAuthValidation } from '~/shared/HOC/WithAuthValidation';
import { WithCategoryValidation } from '~/shared/HOC/WithCategoryValidation';
import { WithMainLayout } from '~/shared/HOC/WithMainLayout';

export const AppRouter = () => (
    <Routes>
        <Route element={<WithMainLayout />}>
            <Route element={<WithAuthValidation />}>
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
            </Route>
            <Route path='/not-found' element={<ErrorPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/verification' element={<VerificationPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='*' element={<Navigate to='/not-found' />} />
    </Routes>
);
