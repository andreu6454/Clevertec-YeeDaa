import { Box, IconButton } from '@chakra-ui/icons';
import { Flex, Image, Text } from '@chakra-ui/react';
import { memo, useRef } from 'react';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useScreenSize } from '~/hooks/useScreenSize';

import Solyanka from '../../../assets/images/solynka.png';
import LeftArrowIcon from '../../../assets/svg/leftArrowIcon.svg';
import RightArrowIcon from '../../../assets/svg/rightArrowIcon.svg';

const sizes = {
    Desktop: {
        fontSize: '48px',
        lineHeight: '100%',
        marginBottom: '24px',
    },
    Laptop: {
        fontSize: '36px',
        lineHeight: '111%',
        marginBottom: '24px',
    },
    Tablet: {
        fontSize: '24px',
        lineHeight: '133%',
        marginBottom: '12px',
    },
    Mobile: {
        fontSize: '24px',
        lineHeight: '133%',
        marginBottom: '12px',
    },
};

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
            <Text
                fontWeight='500'
                fontSize={sizes[screenSize].fontSize}
                lineHeight={sizes[screenSize].lineHeight}
                marginBottom={sizes[screenSize].marginBottom}
            >
                Новые рецепты
            </Text>
            <Flex
                overflow='auto'
                ref={scrollRef}
                gap='12px'
                width='100%'
                sx={{
                    scrollbarWidth: 'none', // Для Firefox
                    '&::-webkit-scrollbar': {
                        display: 'none', // Для Chrome/Safari
                    },
                }}
                paddingY='4px'
            >
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
