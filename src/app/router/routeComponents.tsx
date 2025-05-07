import { Navigate, Route } from 'react-router';

import RecipePage from '~/pages/RecipePage/RecipePage';
import { RecipesListPage } from '~/pages/RecipesListPage/RecipesListPage';
import { CategoryType } from '~/shared/types/categoryTypes';

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
                    element={<RecipesListPage />}
                />
            ))}

            <Route path=':subcategory/:recipeId' element={<RecipePage />} />
        </Route>
    ));
