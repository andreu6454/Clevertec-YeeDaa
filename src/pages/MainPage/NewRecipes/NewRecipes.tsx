import { Box } from '@chakra-ui/icons';
import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useScreenSize } from '~/hooks/useScreenSize';

import Solyanka from '../../../assets/images/solynka.png';

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();

    return (
        <Box width='100%'>
            <Text fontWeight='500' fontSize='48px' lineHeight='100%' marginBottom='24px'>
                Новые рецепты
            </Text>
            <Flex gap='12px' width='100%' overflowX='scroll' paddingY='4px'>
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
                <CardWithImage
                    size={screenSize}
                    image={Solyanka}
                    title='Солянка с грибами'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='Первые блюда'
                />
            </Flex>
        </Box>
    );
});
