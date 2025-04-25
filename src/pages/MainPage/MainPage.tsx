import { Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { NewRecipes } from '~/components/NewRecipes/NewRecipes';
import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { CulinaryBlogs } from '~/pages/MainPage/CulinaryBlogs/CulinaryBlogs';
import { Juiciest } from '~/pages/MainPage/JuciestFood/Juiciest';
import { useAppSelector } from '~/store/hooks';
import { filteredDataSelector, searchCompletedSelector } from '~/store/recipesListPage-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const MainPage: FC = memo(() => {
    const isSearchCompleted = useAppSelector(searchCompletedSelector);

    const recipes = useAppSelector(filteredDataSelector);

    return (
        <Flex width='100%' flexDirection='column' alignItems='center'>
            <SearchBlock title='Приятного аппетита!' />
            {isSearchCompleted ? (
                <Flex width='100%' flexDirection='column' alignItems='center' paddingTop='32px'>
                    <RecipesContainer data={recipes} />
                </Flex>
            ) : (
                <Flex width='100%' flexDirection='column' alignItems='center' gap='40px'>
                    <NewRecipes />
                    <Juiciest />
                    <CulinaryBlogs />
                    <RecommendationBlock
                        title='Веганская кухня'
                        description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
                    />
                </Flex>
            )}
        </Flex>
    );
});
