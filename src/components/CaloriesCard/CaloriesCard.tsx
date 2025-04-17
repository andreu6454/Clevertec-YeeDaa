import { Flex, Text } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CaloriesCardProps {
    title: string;
    count: number;
    units: string;
}

export const CaloriesCard = (props: CaloriesCardProps) => {
    const { title, units, count } = props;

    return (
        <Flex
            width='136px'
            height='136px'
            border='1px solid rgba(0, 0, 0, 0.08)'
            borderRadius='16px'
            padding='16px'
            direction='column'
            align='center'
            gap='12px'
        >
            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.48)'>
                {title}
            </Typography>
            <Text
                fontWeight='500'
                fontSize='36px'
                lineHeight='111%'
                textAlign='center'
                color='#134b00'
            >
                {count}
            </Text>
            <Typography fontWeight={600} Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.92)'>
                {units}
            </Typography>
        </Flex>
    );
};
