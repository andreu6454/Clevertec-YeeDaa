import { memo, useEffect } from 'react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import {
    useGetRecipeByCategoryQuery,
    useLazyGetRecipesWithParamsQuery,
} from '~/query/services/recipes';
import { useGetQueryParams } from '~/shared/hooks/useGetQueryParams';
import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    inputLoadingSelector,
    recipesDataSelector,
    setCategoriesFilter,
    setCurrentPageCategory,
    subCategoriesIdsSelector,
} from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

const RecipesListPage = memo(() => {
    const { screenSize } = useScreenSize();

    const dispatch = useAppDispatch();
    const subCategories = useAppSelector(subCategoriesSelector);
    const categories = useAppSelector(categoriesSelector);
    const subCategoriesIds = useAppSelector(subCategoriesIdsSelector);
    const isInputLoading = useAppSelector(inputLoadingSelector);

    const { category, subcategory } = useRouteSegments();

    const subcategoryId = subCategories.find((el) => el.category === subcategory)?._id || '';
    const categoryInfo = categories.find((el) => el.category === category);

    const [triggerGetRecipes, { isFetching }] = useLazyGetRecipesWithParamsQuery();
    const searchRecipes = useAppSelector(recipesDataSelector);
    const queryParams = useGetQueryParams();

    useEffect(() => {
        dispatch(
            setCategoriesFilter({
                categories: [categoryInfo?._id || ''],
                subcategory: [subcategoryId],
            }),
        );
        dispatch(setCurrentPageCategory(categoryInfo));
    }, [category, subcategory, dispatch]);

    const { data } = useGetRecipeByCategoryQuery({
        subcategoryId: subcategoryId,
        limit: 8,
    });

    useEffect(() => {
        if (subCategoriesIds.length > 1 && !isFetching) {
            triggerGetRecipes(queryParams, false);
        }
    }, [subCategoriesIds]);

    const onSearchHandle = () => {
        if (subCategoriesIds.length > 1 && !isFetching) {
            triggerGetRecipes(queryParams, false);
        }
    };

    const title = categoryInfo?.title || '';
    const description = categoryInfo?.description;
    const links = categoryInfo?.subCategories || [];

    if (isInputLoading) return <FullScreenSpinner />;

    return (
        <CuisinePageLayout
            onSearchHandle={onSearchHandle}
            searchTitle={title}
            searchDescription={description}
        >
            <LinksCarousel category={category} size={screenSize} links={links} />
            <RecipesContainer data={searchRecipes?.data ? searchRecipes.data : data?.data || []} />
        </CuisinePageLayout>
    );
});

export default RecipesListPage;
