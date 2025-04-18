import { Box, Card, Image } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface StepCardProps {
    stepNumber: number;
    description: string;
    image: string;
}

const StepCard = (props: StepCardProps) => {
    const { stepNumber, description, image } = props;
    return (
        <Card direction='row' width='578px' border-radius='8px' overflow='hidden'>
            {image && <Image height='244px' width='346px' src={image} />}
            <Flex padding='20px 24px' direction='column' gap='16px'>
                <Box
                    padding='2px 8px'
                    backgroundColor='rgba(0, 0, 0, 0.06)'
                    borderRadius='4px'
                    width='max-content'
                >
                    <Typography Size={TypographySizes.sm}>{`Шаг ${stepNumber}`}</Typography>
                </Box>
                <Typography
                    maxHeight='100%'
                    Size={TypographySizes.sm}
                    overflow='hidden'
                    textOverflow='ellipsis'
                >
                    {description}
                </Typography>
            </Flex>
        </Card>
    );
};

export default StepCard;
