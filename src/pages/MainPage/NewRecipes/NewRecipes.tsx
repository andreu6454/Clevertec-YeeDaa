import { Box, IconButton } from '@chakra-ui/icons';
import { Flex, Image, Text } from '@chakra-ui/react';
import { memo, useRef } from 'react';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useScreenSize } from '~/hooks/useScreenSize';

import Solyanka from '../../../assets/images/solynka.png';
import LeftArrowIcon from '../../../assets/svg/leftArrowIcon.svg';
import RightArrowIcon from '../../../assets/svg/rightArrowIcon.svg';

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();

    const scrollRef = useRef<HTMLDivElement>(null);

    const amount = screenSize === 'Desktop' ? 346 : 289;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -amount : amount;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Box width='100%'>
            <Text fontWeight='500' fontSize='48px' lineHeight='100%' marginBottom='24px'>
                Новые рецепты
            </Text>
            <Flex ref={scrollRef} gap='12px' width='100%' overflowX='scroll' paddingY='4px'>
                {(screenSize === 'Desktop' || screenSize === 'Laptop') && (
                    <IconButton
                        zIndex={3}
                        aria-label='Previous'
                        icon={<Image src={LeftArrowIcon} />}
                        position='absolute'
                        transform='translate(-20%, 350%)'
                        onClick={() => scroll('left')}
                    />
                )}
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
                {(screenSize === 'Desktop' || screenSize === 'Laptop') && (
                    <IconButton
                        zIndex={3}
                        aria-label='Previous'
                        icon={<Image src={RightArrowIcon} />}
                        position='absolute'
                        transform={
                            screenSize === 'Desktop'
                                ? 'translate(1324px, 350%)'
                                : 'translate(842px, 350%)'
                        }
                        onClick={() => scroll('right')}
                    />
                )}
            </Flex>
        </Box>
    );
});
