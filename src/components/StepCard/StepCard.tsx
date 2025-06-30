import { Box, Card, Image } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface StepCardProps {
    stepNumber: number;
    description: string;
    image: string;
}

const StepCard = (props: StepCardProps) => {
    const { stepNumber, description, image } = props;
    return (
        <Card
            direction='row'
            width={{ base: '100%', md: '604px', xl: '578px', '2xl': '668px' }}
            border-radius='8px'
            overflow='hidden'
        >
            {image && (
                <Image
                    height={{ base: '158px', xl: '346px' }}
                    width={{ base: '128px', xl: '244px' }}
                    src={getImageUrl(image)}
                />
            )}
            <Flex
                padding={{ base: '8px 8px 0 8px', md: '8px', xl: '20px 24px' }}
                direction='column'
                gap={{ base: '12px', xl: '16px' }}
            >
                <Box
                    padding='2px 8px'
                    backgroundColor='rgba(0, 0, 0, 0.06)'
                    borderRadius='4px'
                    width='max-content'
                >
                    <Typography Size={TypographySizes.sm}>{`Шаг ${stepNumber}`}</Typography>
                </Box>
                <Typography
                    maxHeight={{ base: '80px', md: '' }}
                    Size={TypographySizes.sm}
                    overflow='hidden'
                    noOfLines={9}
                >
                    {description}
                </Typography>
            </Flex>
        </Card>
    );
};

export default StepCard;
