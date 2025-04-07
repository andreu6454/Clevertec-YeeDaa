import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { FoodSearchCard } from '~/components/FoodSearchCard/FoodSearchCard';
import { RecommendationBlock } from '~/components/RecommendationBlock/RecommendationBlock';
import { CardContainer } from '~/pages/VeganfoodPage/CardContainer/CardContainer';

export const VeganfoodPage = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <FoodSearchCard />
        <CardContainer />
        <RecommendationBlock
            title='Десерты, выпечка'
            description='Без них невозможно представить себе ни современную, ни традиционную кулинарию. Пироги и печенья, блины, пончики, вареники и, конечно, хлеб — рецепты изделий из теста многообразны и невероятно популярны..'
        />
    </Flex>
));
