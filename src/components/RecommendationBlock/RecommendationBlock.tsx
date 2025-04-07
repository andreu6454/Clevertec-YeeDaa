import { Flex, Text } from '@chakra-ui/react';

import { CardWithIcon } from '~/components/CardWithIcon/CardWithIcon';
import { CardWithoutImage } from '~/components/CardWithoutImage/CardWithoutImage';
import { useScreenSize } from '~/hooks/useScreenSize';

import PotIcon from '../../assets/svg/firstCourses.svg';
import KitchenIcon from '../../assets/svg/secondCourses.svg';

const sizes = {
    Desktop: {
        width: '668px',
        gap: '24px',
    },
    Laptop: {
        width: '578px',
        gap: '24px',
    },
    Tablet: {
        width: '100%',
        gap: '16px',
    },
    Mobile: {
        width: '100%',
        gap: '16px',
    },
};

interface RecommendationBlockProps {
    title: string;
    description: string;
}

export const RecommendationBlock = (props: RecommendationBlockProps) => {
    const { title, description } = props;

    const { screenSize, isTablet, isLaptop } = useScreenSize();

    const direction = screenSize === 'Mobile' || screenSize === 'Tablet' ? 'column' : 'row';
    return (
        <Flex
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            width='100%'
            direction='column'
            gap={sizes[screenSize].gap}
            paddingTop='24px'
        >
            <Flex width='100%' justifyContent='space-between' direction={direction}>
                <Text
                    width={isLaptop ? '270px' : ''}
                    fontWeight='500'
                    fontSize='36px'
                    lineHeight='111%'
                    whiteSpace='pre-line'
                >
                    {title}
                </Text>
                <Text
                    width={sizes[screenSize].width}
                    fontWeight='500'
                    fontSize='16px'
                    lineHeight='150%'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {description}
                </Text>
            </Flex>
            <Flex gap='16px'>
                <CardWithoutImage
                    size={screenSize}
                    title='Бананово-молочное желе'
                    description='Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.'
                    dishType='Детские блюда'
                />
                <CardWithoutImage
                    size={screenSize}
                    title='Нежный сливочно-сырный крем для кексов'
                    description='Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.'
                    dishType='Детские блюда'
                />
                <Flex
                    gap={isTablet ? '6px' : '12px'}
                    justifyContent='space-between'
                    direction='column'
                >
                    <CardWithIcon
                        size={screenSize}
                        icon={KitchenIcon}
                        title='Стейк для вегетарианцев'
                    />
                    <CardWithIcon
                        size={screenSize}
                        icon={KitchenIcon}
                        title='Котлеты из гречки и фасоли'
                    />
                    <CardWithIcon
                        size={screenSize}
                        icon={PotIcon}
                        title='Сырный суп с лапшой и брокколи'
                    />
                </Flex>
            </Flex>
        </Flex>
    );
};
