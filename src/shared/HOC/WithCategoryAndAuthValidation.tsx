import { useEffect } from 'react';
import { Navigate, Outlet, useParams } from 'react-router';

import { APP_PATHS } from '~/shared/constants/pathes';
import { isLoginSelector } from '~/store/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setCategoriesFilter, setCurrentPageCategory } from '~/store/recipesListPage-slice';

export const WithCategoryAndAuthValidation = () => {
    const dispatch = useAppDispatch();
    const { category, subcategory } = useParams();
    const isAuthenticated = useAppSelector(isLoginSelector);

    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const currentCategory = categories.find((cat) => cat.category === category);
    const currentSubcategory = subCategories.find((cat) => cat.category === subcategory);

    useEffect(() => {
        dispatch(
            setCategoriesFilter({
                categories: [currentCategory?._id || ''],
                subcategory: [currentSubcategory?._id || ''],
            }),
        );
        dispatch(setCurrentPageCategory(currentCategory));
    }, [category, subcategory, dispatch]);

    if (currentCategory && !subcategory) {
        return (
            <Navigate
                to={`/${currentCategory.category}/${currentCategory.subCategories[0].category}`}
            />
        );
    }

    if (!currentCategory || !currentSubcategory) {
        return <Navigate to={APP_PATHS.notFound} replace />;
    }

    if (!isAuthenticated) {
        return <Navigate to={APP_PATHS.login} replace />;
    }

    return <Outlet />;
};
