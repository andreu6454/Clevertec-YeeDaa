import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { SearchBlock } from '~/components/SearchBlock/SearchBlock';
import { JuiciestPageData } from '~/shared/data/juiciestPageData';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';
import { RecommendationBlock } from '~/widgets/RecommendationBlock/RecommendationBlock';

export const JuiciestFood = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <SearchBlock title='Самое сочное' />
        <RecipesContainer data={JuiciestPageData} />
        <RecommendationBlock
            title='Веганская кухня'
            description='Интересны не только убеждённым вегетарианцам, но и тем, кто хочет  попробовать вегетарианскую диету и готовить вкусные  вегетарианские блюда.'
        />
    </Flex>
));
