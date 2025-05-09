import { ReactNode, useEffect } from 'react';
import { Navigate, useParams } from 'react-router';

import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setCategoriesFilter, setCurrentPageCategory } from '~/store/recipesListPage-slice';

type WithCategoryValidationProps = {
    children: ReactNode;
};

export const WithCategoryValidation = (props: WithCategoryValidationProps) => {
    const { children } = props;
    const dispatch = useAppDispatch();
    const { category, subcategory } = useParams();

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
        return <Navigate to='/not-found' replace />;
    }

    return children;
};
