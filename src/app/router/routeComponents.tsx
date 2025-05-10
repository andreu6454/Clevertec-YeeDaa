import { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { CategoryType } from '~/shared/types/categoryTypes';

const RecipesListPage = lazy(() => import('~/pages/RecipesListPage/RecipesListPage'));
const RecipePage = lazy(() => import('~/pages/RecipePage/RecipePage'));

interface CreateRoutesProps {
    data: CategoryType[];
}

export const createRoutes = ({ data }: CreateRoutesProps) =>
    data.map((category) => (
        <Route path={`/${category.category}`} key={category.category}>
            <Route index element={<Navigate to={category.subCategories[0].category} replace />} />

            {category.subCategories.map((subItem) => (
                <Route
                    path={`${subItem.category}/`}
                    key={subItem.category}
                    element={
                        <Suspense fallback={<FullScreenSpinner />}>
                            <RecipesListPage />
                        </Suspense>
                    }
                />
            ))}

            <Route
                path=':subcategory/:recipeId'
                element={
                    <Suspense fallback={<FullScreenSpinner />}>
                        <RecipePage />
                    </Suspense>
                }
            />
        </Route>
    ));
