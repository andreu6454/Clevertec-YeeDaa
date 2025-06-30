import { Flex, Text } from '@chakra-ui/react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CaloriesCardProps {
    title: string;
    count: number;
    units: string;
}

export const CaloriesCard = (props: CaloriesCardProps) => {
    const { title, units, count } = props;

    const { isMobile } = useScreenSize();

    return (
        <Flex
            width={{ base: '328px', md: '173px', xl: '136px', '2xl': '149px' }}
            height={{ base: '64px', md: '136px' }}
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='16px'
            padding={{ base: '16px 12px', md: '16px' }}
            direction={{ base: 'row', md: 'column' }}
            align='center'
            gap={{ base: '4px', md: '12px' }}
        >
            <Typography
                width={isMobile ? '118px' : ''}
                Size={TypographySizes.sm}
                color='rgba(0, 0, 0, 0.48)'
            >
                {title}
            </Typography>
            <Text
                width={{ base: '118px', md: '' }}
                fontWeight='500'
                fontSize={{ base: '24px', md: '36px' }}
                lineHeight={{ base: '133%', md: '111%' }}
                textAlign='center'
                color='#134b00'
            >
                {count}
            </Text>
            <Typography
                width={isMobile ? '61px' : ''}
                fontWeight={600}
                Size={TypographySizes.sm}
                color='rgba(0, 0, 0, 0.92)'
            >
                {units}
            </Typography>
        </Flex>
    );
};
