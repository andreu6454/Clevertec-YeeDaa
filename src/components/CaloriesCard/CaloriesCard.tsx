import { Flex, Text } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CaloriesCardProps {
    title: string;
    count: number;
    units: string;
    screenSize: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
}

const sizes = {
    Desktop: {
        width: '149px',
        height: '136px',
    },
    Laptop: {
        width: '136px',
        height: '136px',
    },
    Tablet: {
        width: '173px',
        height: '136px',
    },
    Mobile: {
        width: '328px',
        height: '64px',
    },
};

export const CaloriesCard = (props: CaloriesCardProps) => {
    const { title, units, count, screenSize } = props;

    return (
        <Flex
            width={sizes[screenSize].width}
            height={sizes[screenSize].height}
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='16px'
            padding={screenSize === 'Mobile' ? '16px 12px' : '16px'}
            direction={screenSize === 'Mobile' ? 'row' : 'column'}
            align='center'
            gap={screenSize === 'Mobile' ? '4px' : '12px'}
        >
            <Typography
                width={screenSize === 'Mobile' ? '118px' : ''}
                Size={TypographySizes.sm}
                color='rgba(0, 0, 0, 0.48)'
            >
                {title}
            </Typography>
            <Text
                width={screenSize === 'Mobile' ? '118px' : ''}
                fontWeight='500'
                fontSize={screenSize === 'Mobile' ? '24px' : '36px'}
                lineHeight={screenSize === 'Mobile' ? '133%' : '111%'}
                textAlign='center'
                color='#134b00'
            >
                {count}
            </Text>
            <Typography
                width={screenSize === 'Mobile' ? '61px' : ''}
                fontWeight={600}
                Size={TypographySizes.sm}
                color='rgba(0, 0, 0, 0.92)'
            >
                {units}
            </Typography>
        </Flex>
    );
};
