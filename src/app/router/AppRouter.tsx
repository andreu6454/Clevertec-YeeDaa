import { Navigate, Route, Routes } from 'react-router';

import { NotFoundPage } from '~/pages/ErrorPage/NotFoundPage';
import { JuiciestFoodPage } from '~/pages/JuiciestFoodPage/JuiciestFoodPage';
import { LoginPage } from '~/pages/LoginPage/LoginPage';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import RecipePage from '~/pages/RecipePage/RecipePage';
import RecipesListPage from '~/pages/RecipesListPage/RecipesListPage';
import { RegistrationPage } from '~/pages/RegistrationPage/RegistrationPage';
import { VerificationPage } from '~/pages/VerificationPage/VerificationPage';
import { APP_PATHS } from '~/shared/constants/pathes';
import { WithAuthValidation } from '~/shared/HOC/WithAuthValidation';
import { WithCategoriesFetching } from '~/shared/HOC/WithCategoriesFetching';
import { WithCategoryAndAuthValidation } from '~/shared/HOC/WithCategoryAndAuthValidation';
import { WithMainLayout } from '~/shared/HOC/WithMainLayout';

export const AppRouter = () => (
    <Routes>
        <Route path={APP_PATHS.login} element={<LoginPage />} />
        <Route path={APP_PATHS.verification} element={<VerificationPage />} />
        <Route path={APP_PATHS.signUp} element={<RegistrationPage />} />

        <Route element={<WithMainLayout />}>
            <Route path={APP_PATHS.notFound} element={<NotFoundPage />} />
        </Route>

        <Route element={<WithCategoriesFetching />}>
            <Route element={<WithMainLayout />}>
                <Route element={<WithAuthValidation />}>
                    <Route index element={<MainPage />} />
                    <Route path={APP_PATHS.recipePage} element={<RecipePage />} />
                    <Route path={APP_PATHS.theJuiciest} element={<JuiciestFoodPage />} />
                </Route>
                <Route element={<WithCategoryAndAuthValidation />}>
                    <Route path={APP_PATHS.category} element={<RecipesListPage />} />
                    <Route path={APP_PATHS.subcategory} element={<RecipesListPage />} />
                </Route>
            </Route>
        </Route>

        <Route path='*' element={<Navigate to={APP_PATHS.notFound} />} />
    </Routes>
);
