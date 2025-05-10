import { memo, useEffect, useState } from 'react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { Recipe } from '~/shared/types/recipeTypes';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const JuiciestFoodPage = memo(() => {
    const [page, setPage] = useState(1);
    const [isLastPage, setIsLastPage] = useState(false);

    const { data, isLoading, isError, isFetching } = useGetRecipesQuery(
        {
            sortBy: 'likes',
            sortOrder: 'desc',
            page: page,
            limit: 8,
        },
        {
            refetchOnMountOrArgChange: true,
        },
    );

    const dispatch = useAppDispatch();

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (data && page > 1 && !isFetching) {
            setAllRecipes((prev) => [...prev, ...data.data]);
        } else if (data && !isFetching) {
            setAllRecipes(data.data);
        }
        if (data && page >= data?.meta.totalPages) {
            setIsLastPage(true);
        }
    }, [data, page]);

    const onLoadMoreClick = () => {
        setPage(page + 1);
    };

    if (isLoading || (isFetching && page === 1)) return <FullScreenSpinner />;
    if (isError) {
        dispatch(setAppError('error'));
    }
    return (
        <CuisinePageLayout searchTitle='Самое сочное'>
            <RecipesContainer
                isLoading={isFetching || isLoading}
                isLastPage={isLastPage}
                onClickHandler={onLoadMoreClick}
                data={allRecipes}
            />
        </CuisinePageLayout>
    );
});
