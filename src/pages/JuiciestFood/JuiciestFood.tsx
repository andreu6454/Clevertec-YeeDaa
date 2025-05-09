import { memo, useEffect, useState } from 'react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetJuiciestPageRecipesQuery } from '~/query/services/recipes';
import { CuisinePageLayout } from '~/shared/layouts/CuisinePageLayout';
import { Recipe } from '~/shared/types/recipeTypes';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const JuiciestFood = memo(() => {
    const [page, setPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    const { data, isLoading } = useGetJuiciestPageRecipesQuery(page);

    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (data) {
            setAllRecipes((prev) => [...prev, ...data.data]);
            setIsButtonLoading(false);
        }
    }, [data]);

    useEffect(() => {
        if (data && page >= data?.meta.totalPages) {
            setIsLastPage(true);
        }
    }, [data, page]);

    const onLoadMoreClick = () => {
        setIsButtonLoading(true);
        setPage(page + 1);
    };

    if (isLoading) return <FullScreenSpinner />;
    return (
        <CuisinePageLayout onSearchHandle={() => {}} searchTitle='Самое сочное'>
            <RecipesContainer
                isLoading={isButtonLoading}
                isLastPage={isLastPage}
                onClickHandler={onLoadMoreClick}
                data={allRecipes}
            />
        </CuisinePageLayout>
    );
});
