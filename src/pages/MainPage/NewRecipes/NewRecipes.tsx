import { Box } from '@chakra-ui/icons';
import { memo } from 'react';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useScreenSize } from '~/hooks/useScreenSize';
import { Carousel } from '~/shared/ui/Carousel/Carousel';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';

import Solyanka from '../../../assets/images/solynka.png';

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();

    return (
        <Box width='100%'>
            <PageBlockTitle title='Новые рецепты' />
            <Carousel>
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
            </Carousel>
        </Box>
    );
});
