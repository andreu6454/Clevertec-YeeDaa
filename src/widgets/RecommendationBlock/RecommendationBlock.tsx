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
        fTitleSize: '48px',
        lTitleHeight: '100%',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Laptop: {
        width: '578px',
        gap: '24px',
        fTitleSize: '48px',
        lTitleHeight: '100%',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Tablet: {
        width: '100%',
        gap: '16px',
        fTitleSize: '24px',
        lTitleHeight: '133%',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
    Mobile: {
        width: '100%',
        gap: '16px',
        fTitleSize: '24px',
        lTitleHeight: '133%',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
};

interface RecommendationBlockProps {
    title: string;
    description: string;
}

export const RecommendationBlock = (props: RecommendationBlockProps) => {
    const { title, description } = props;

    const { screenSize, isLaptop } = useScreenSize();

    const direction = screenSize === 'Mobile' || screenSize === 'Tablet' ? 'column' : 'row';
    return (
        <Flex
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            width='100%'
            direction='column'
            gap={sizes[screenSize].gap}
            paddingTop='24px'
        >
            <Flex
                gap={screenSize === 'Mobile' || screenSize === 'Tablet' ? '12px' : ''}
                width='100%'
                justifyContent='space-between'
                direction={direction}
            >
                <Text
                    width={isLaptop ? '270px' : ''}
                    fontWeight='500'
                    fontSize={sizes[screenSize].fTitleSize}
                    lineHeight={sizes[screenSize].lTitleHeight}
                    whiteSpace='pre-line'
                >
                    {title}
                </Text>
                <Text
                    width={sizes[screenSize].width}
                    fontWeight='500'
                    fontSize={sizes[screenSize].fDescSize}
                    lineHeight={sizes[screenSize].lDescHeight}
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {description}
                </Text>
            </Flex>
            <Flex
                gap='16px'
                direction={screenSize === 'Mobile' ? 'column' : 'row'}
                alignItems='center'
            >
                <CardWithoutImage
                    size={screenSize}
                    title='Бананово-молочное желе'
                    description='Молочное желе – это просто, вкусно и полезно, ведь для его приготовления в качестве основы используется молоко.'
                    dishType='child'
                />
                <CardWithoutImage
                    size={screenSize}
                    title='Нежный сливочно-сырный крем для кексов'
                    description='Сливочно-сырным кремом можно украсить кексы, либо другую выпечку, а также этим кремом можно наполнить заварные пирожные.'
                    dishType='child'
                />
                <Flex gap='12px' justifyContent='space-between' direction='column'>
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
