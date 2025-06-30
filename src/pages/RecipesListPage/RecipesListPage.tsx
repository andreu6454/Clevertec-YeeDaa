import { memo, useEffect, useState } from 'react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { LinksCarousel } from '~/components/LinksCarousel/LinksCarousel';
import {
    useGetRecipeByCategoryQuery,
    useLazyGetRecipesWithParamsQuery,
} from '~/query/services/recipes';
import { useGetQueryParams } from '~/shared/hooks/useGetQueryParams';
import { useRouteSegments } from '~/shared/hooks/useRouteSegments';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import {
    inputLoadingSelector,
    recipesDataSelector,
    subCategoriesIdsSelector,
} from '~/store/slices/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

const RecipesListPage = memo(() => {
    const dispatch = useAppDispatch();
    const subCategories = useAppSelector(subCategoriesSelector);
    const categories = useAppSelector(categoriesSelector);
    const subCategoriesIds = useAppSelector(subCategoriesIdsSelector);
    const isInputLoading = useAppSelector(inputLoadingSelector);

    const [page] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);

    const { category, subcategory } = useRouteSegments();

    const subcategoryId = subCategories.find((el) => el.category === subcategory)?._id || '';
    const categoryInfo = categories.find((el) => el.category === category);

    const [triggerGetRecipes, { isFetching, isError, isLoading: IsLoadingWithParams }] =
        useLazyGetRecipesWithParamsQuery();
    const searchRecipes = useAppSelector(recipesDataSelector);
    const queryParams = useGetQueryParams();

    const {
        data,
        isError: isByCategoryError,
        isLoading,
        isFetching: isFetchingByCategory,
    } = useGetRecipeByCategoryQuery({
        subcategoryId: subcategoryId,
        limit: 8,
    });

    useEffect(() => {
        if (data && page >= data?.meta?.totalPages) {
            setIsLastPage(true);
        }
    }, [data, page]);

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

    if (isInputLoading || isLoading || IsLoadingWithParams || isFetchingByCategory)
        return <FullScreenSpinner />;
    if (isError || isByCategoryError) {
        dispatch(setAppError('error'));
    }
    return (
        <CuisinePageLayout
            onSearchHandle={onSearchHandle}
            searchTitle={title}
            searchDescription={description}
        >
            <LinksCarousel category={category} links={links} />
            <RecipesContainer
                isLastPage={isLastPage}
                data={searchRecipes?.data ? searchRecipes.data : data?.data || []}
            />
        </CuisinePageLayout>
    );
});

export default RecipesListPage;
