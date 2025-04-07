import { Flex } from '@chakra-ui/react';
import { FC, memo } from 'react';

import { FoodSearchCard } from '~/components/FoodSearchCard/FoodSearchCard';
import { CulinaryBlogs } from '~/pages/MainPage/CulinaryBlogs/CulinaryBlogs';
import { Juiciest } from '~/pages/MainPage/JuciestFood/Juiciest';
import { NewRecipes } from '~/pages/MainPage/NewRecipes/NewRecipes';
import { VeganCousin } from '~/pages/MainPage/VeganCousin/VeganCousin';

export const MainPage: FC = memo(() => (
    <Flex width='100%' flexDirection='column' alignItems='center'>
        <FoodSearchCard />
        <Flex width='100%' flexDirection='column' alignItems='center' gap='40px'>
            <NewRecipes />
            <Juiciest />
            <CulinaryBlogs />
            <VeganCousin />
        </Flex>
    </Flex>
));
