import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { FoodSearchCard } from '~/components/FoodSearchCard/FoodSearchCard';
import { CardContainer } from '~/pages/VeganfoodPage/CardContainer/CardContainer';

export const VeganfoodPage = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <FoodSearchCard />
        <CardContainer />
    </Flex>
));
