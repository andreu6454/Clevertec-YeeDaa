import { Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { FoodSearchCard } from '~/components/FoodSearchCard/FoodSearchCard';

export const MainPage: FC = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <FoodSearchCard />
    </Flex>
));
