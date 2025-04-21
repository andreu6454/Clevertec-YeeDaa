import { Navigate, Route } from 'react-router';

import RecipePage from '~/pages/RecipePage/RecipePage';
import { RecipesListPage } from '~/pages/RecipesListPage/RecipesListPage';

type NavItem = {
    icon: string;
    title: string;
    general: string;
    links: Array<{
        title: string;
        link: string;
    }>;
};

interface CreateRoutesProps {
    data: NavItem[];
}

export const createRoutes = ({ data }: CreateRoutesProps) =>
    data.map((category) => (
        <Route path={`/${category.general}`} key={category.general}>
            <Route index element={<Navigate to={category.links[0].link} replace />} />

            {category.links.map((subItem) => (
                <Route path={`${subItem.link}/`} key={subItem.link} element={<RecipesListPage />} />
            ))}

            <Route path=':subcategory/:recipeId' element={<RecipePage />} />
        </Route>
    ));
