import { Flex } from '@chakra-ui/react';
import { FC, memo, useEffect, useState } from 'react';

import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { CulinaryBlogs } from '~/pages/MainPage/CulinaryBlogs/CulinaryBlogs';
import { Juiciest } from '~/pages/MainPage/JuciestFood/Juiciest';
import { useLazyGetRecipesWithParamsQuery } from '~/query/services/recipes';
import { useGetQueryParams } from '~/shared/hooks/useGetQueryParams';
import { Recipe } from '~/shared/types/recipeTypes';
import { setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { recipesDataSelector, setCurrentPageCategory } from '~/store/recipesListPage-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const MainPage: FC = memo(() => {
    const queryParams = useGetQueryParams();

    const data = useAppSelector(recipesDataSelector);
    const dispatch = useAppDispatch();

    const [page, setPage] = useState<number>(1);
    const [isLastPage, setIsLastPage] = useState<boolean>(false);
    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);
    const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

    useEffect(() => {
        if (!data.data) return;
        if (data?.data && page > 1) {
            setAllRecipes((prev) => [...prev, ...data.data]);
        } else if (data?.data) {
            setAllRecipes(data.data);
        }
        setIsButtonLoading(false);
    }, [data]);

    const onLoadMoreClick = () => {
        setIsButtonLoading(true);
        setPage(page + 1);
        triggerGetRecipes({ ...queryParams, page: page + 1 }, false);
    };

    useEffect(() => {
        if (!data.data) return;
        if (data.meta && page >= data?.meta?.totalPages) {
            setIsLastPage(true);
        }
    }, [data, page]);

    useEffect(() => {
        dispatch(setCurrentPageCategory(undefined));
    }, [dispatch]);

    const [triggerGetRecipes, { isError }] = useLazyGetRecipesWithParamsQuery();

    const onSearchHandle = () => {
        triggerGetRecipes({ ...queryParams, page: page }, false);
    };

    if (isError) {
        dispatch(setAppError('error'));
    }
    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock onSearchHandle={onSearchHandle} title='Приятного аппетита!' />
            {allRecipes.length === 0 ? (
                <Flex width='100%' flexDirection='column' alignItems='center' gap='40px'>
                    <NewRecipes />
                    <Juiciest />
                    <CulinaryBlogs />
                    <RecommendationBlock />
                </Flex>
            ) : (
                <Flex width='100%' flexDirection='column' alignItems='center' paddingTop='32px'>
                    <RecipesContainer
                        isLoading={isButtonLoading}
                        isLastPage={isLastPage}
                        data={allRecipes}
                        onClickHandler={onLoadMoreClick}
                    />
                </Flex>
            )}
        </Flex>
    );
});
