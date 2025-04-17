import { ComponentType } from 'react';
import { Navigate, Route, useLocation } from 'react-router';

import RecipePage from '~/pages/RecipePage/RecipePage';
import { VeganPage } from '~/pages/VeganPage/VeganPage';

type NavItem = {
    icon: string;
    title: string;
    general: string;
    links: Array<{
        title: string;
        link: string;
    }>;
};

type PageComponents = {
    [key: string]: ComponentType;
};

interface CreateRoutesProps {
    data: NavItem[];
}

const pageComponents: PageComponents = {
    // 'salads': SaladsPage,
    // 'snacks': SnacksPage,
    // 'first-courses': FirstCoursesPage,
    // 'second-courses': SecondCoursesPage,
    // 'desserts': DessertsPage,
    // 'grilled': GrilledPage,
    vegan: VeganPage,
    // 'child': ChildPage,
    // 'healthy': HealthyPage,
    // 'national': NationalPage,
    // 'sauces': SaucesPage,
    // 'drinks': DrinksPage,
    // 'preparations': PreparationsPage
};

const GetComponent = (general: string) => {
    const location = useLocation();
    const isRecipePage = location.pathname.split('/').length > 3;

    if (isRecipePage) {
        return null;
    }

    const Component = pageComponents[general];
    return Component ? <Component /> : <Navigate to='/404' replace />;
};

export const createRoutes = ({ data }: CreateRoutesProps) =>
    data.map((category) => (
        <Route path={`/${category.general}`} key={category.general}>
            <Route index element={<Navigate to={category.links[0].link} replace />} />

            {category.links.map((subItem) => (
                <Route
                    path={`${subItem.link}/`}
                    key={subItem.link}
                    element={GetComponent(category.general)}
                />
            ))}

            <Route path=':subcategory/:recipeId' element={<RecipePage />} />
        </Route>
    ));
