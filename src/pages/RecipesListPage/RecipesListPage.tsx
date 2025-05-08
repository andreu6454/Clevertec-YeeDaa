import { memo, useEffect } from 'react';

import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import { useGetRecipeByCategoryQuery } from '~/query/services/recipes';
import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setCategoriesFilter, setFilteredData } from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

const RecipesListPage = memo(() => {
    const { screenSize } = useScreenSize();

    const dispatch = useAppDispatch();
    const subCategories = useAppSelector(subCategoriesSelector);
    const categories = useAppSelector(categoriesSelector);

    const { category, subcategory } = useRouteSegments();

    const subcategoryId = subCategories.find((el) => el.category === subcategory)?._id || '';
    const categoryInfo = categories.find((el) => el.category === category);

    const { data } = useGetRecipeByCategoryQuery({
        subcategoryId: subcategoryId,
        limit: 8,
    });

    useEffect(() => {
        dispatch(setCategoriesFilter({ categories: [category], subcategory: subcategory }));
        dispatch(setFilteredData());
    }, [category, subcategory, dispatch]);

    const title = categoryInfo?.title || '';
    const description = categoryInfo?.description;
    const links = categoryInfo?.subCategories || [];

    // if (isLoading) return <FullScreenSpinner />;
    return (
        <CuisinePageLayout searchTitle={title} searchDescription={description}>
            <LinksCarousel category={category} size={screenSize} links={links} />
            <RecipesContainer data={data?.data || []} />
        </CuisinePageLayout>
    );
});

export default RecipesListPage;
