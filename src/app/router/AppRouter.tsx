import { createBrowserRouter, createRoutesFromElements, Navigate, Route } from 'react-router';

import { BloggerPage } from '~/pages/BloggerPage/BloggerPage';
import { BlogsPage } from '~/pages/BlogsPage/BlogsPage';
import { NotFoundPage } from '~/pages/ErrorPage/NotFoundPage';
import { JuiciestFoodPage } from '~/pages/JuiciestFoodPage/JuiciestFoodPage';
import { LoginPage } from '~/pages/LoginPage/LoginPage';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import { NewRecipePage } from '~/pages/NewRecipePage/NewRecipePage';
import ProfilePage from '~/pages/ProfilePage/ProfilePage';
import ProfileSettingsPage from '~/pages/ProfileSettingsPage/ProfileSettingsPage';
import RecipePage from '~/pages/RecipePage/RecipePage';
import RecipesListPage from '~/pages/RecipesListPage/RecipesListPage';
import { RegistrationPage } from '~/pages/RegistrationPage/RegistrationPage';
import { VerificationPage } from '~/pages/VerificationPage/VerificationPage';
import { APP_PATHS } from '~/shared/constants/pathes';
import { WithAuthValidation } from '~/shared/HOC/WithAuthValidation';
import { WithCategoriesFetching } from '~/shared/HOC/WithCategoriesFetching';
import { WithCategoryValidation } from '~/shared/HOC/WithCategoryValidation';
import { WithMainLayout } from '~/shared/HOC/WithMainLayout';

export const AppRouter = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path={APP_PATHS.login} element={<LoginPage />} />
            <Route path={APP_PATHS.verification} element={<VerificationPage />} />
            <Route path={APP_PATHS.signUp} element={<RegistrationPage />} />

            <Route element={<WithMainLayout />}>
                <Route path={APP_PATHS.notFound} element={<NotFoundPage />} />
            </Route>

            <Route element={<WithAuthValidation />}>
                <Route element={<WithCategoriesFetching />}>
                    <Route element={<WithMainLayout />}>
                        <Route index element={<MainPage />} />
                        <Route path={APP_PATHS.recipePage} element={<RecipePage />} />
                        <Route path={APP_PATHS.theJuiciest} element={<JuiciestFoodPage />} />
                        <Route path={APP_PATHS.newRecipe} element={<NewRecipePage />} />
                        <Route path={APP_PATHS.editRecipe} element={<NewRecipePage />} />
                        <Route path={APP_PATHS.editDraft} element={<NewRecipePage />} />
                        <Route path={APP_PATHS.blogs} element={<BlogsPage />} />
                        <Route path={APP_PATHS.bloggerPage} element={<BloggerPage />} />
                        <Route path={APP_PATHS.profile} element={<ProfilePage />} />
                        <Route path={APP_PATHS.profileSettings} element={<ProfileSettingsPage />} />
                        <Route element={<WithCategoryValidation />}>
                            <Route path={APP_PATHS.category} element={<RecipesListPage />} />
                            <Route path={APP_PATHS.subcategory} element={<RecipesListPage />} />
                        </Route>
                    </Route>
                </Route>
            </Route>

            <Route path='*' element={<Navigate to={APP_PATHS.notFound} />} />
        </Route>,
    ),
    {
        basename: '/Clevertec-YeeDaa',
    },
);
