import { Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { CulinaryBlogs } from '~/pages/MainPage/CulinaryBlogs/CulinaryBlogs';
import { Juiciest } from '~/pages/MainPage/JuciestFood/Juiciest';
import { useAppSelector } from '~/store/hooks';
import { searchCompletedSelector } from '~/store/recipesListPage-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const MainPage: FC = memo(() => {
    const isSearchCompleted = useAppSelector(searchCompletedSelector);

    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock title='Приятного аппетита!' />
            {isSearchCompleted ? (
                <Flex width='100%' flexDirection='column' alignItems='center' paddingTop='32px'>
                    <RecipesContainer data={[]} />
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
