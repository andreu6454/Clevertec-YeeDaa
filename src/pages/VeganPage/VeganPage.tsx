import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { RecipesContainer } from '~/components/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/components/RecommendationBlock/RecommendationBlock';
import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { VeganPageData } from '~/shared/data/veganPageData';

export const VeganPage = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <SearchBlock
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
        />
        <RecipesContainer data={VeganPageData} />
        <RecommendationBlock
            title='Десерты, выпечка'
            description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
        />
    </Flex>
));
