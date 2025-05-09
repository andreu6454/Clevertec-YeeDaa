import { Flex } from '@chakra-ui/react';
import { FC, memo, useEffect } from 'react';

import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { CulinaryBlogs } from '~/pages/MainPage/CulinaryBlogs/CulinaryBlogs';
import { Juiciest } from '~/pages/MainPage/JuciestFood/Juiciest';
import { useLazyGetRecipesWithParamsQuery } from '~/query/services/recipes';
import { useGetQueryParams } from '~/shared/hooks/useGetQueryParams';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { recipesDataSelector, setCurrentPageCategory } from '~/store/recipesListPage-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const MainPage: FC = memo(() => {
    // const isSearchCompleted = useAppSelector(searchCompletedSelector);
    const queryParams = useGetQueryParams();

    const data = useAppSelector(recipesDataSelector);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setCurrentPageCategory(undefined));
    }, [dispatch]);

    const [triggerGetRecipes] = useLazyGetRecipesWithParamsQuery();

    const onSearchHandle = () => {
        triggerGetRecipes(queryParams, false);
    };

    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock onSearchHandle={onSearchHandle} title='Приятного аппетита!' />
            {data?.data?.length > 0 ? (
                <Flex width='100%' flexDirection='column' alignItems='center' paddingTop='32px'>
                    <RecipesContainer data={data?.data} />
                </Flex>
            ) : (
                <Flex width='100%' flexDirection='column' alignItems='center' gap='40px'>
                    <NewRecipes />
                    <Juiciest />
                    <CulinaryBlogs />
                    <RecommendationBlock />
                </Flex>
            )}
        </Flex>
    );
});
