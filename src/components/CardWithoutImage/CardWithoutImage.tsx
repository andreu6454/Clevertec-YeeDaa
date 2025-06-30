import { Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithoutImageProps {
    title: string;
    description: string;
    dishType: string;
    onClick?: () => void;
}

export const CardWithoutImage = (props: CardWithoutImageProps) => {
    const { title, description, dishType, onClick } = props;

    const { isTabletMobile } = useScreenSize();

    return (
        <Card
            cursor='pointer'
            onClick={onClick}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            width={{ base: '100%', md: '232px', xl: '282px', '2xl': '322px' }}
            height={{ base: '168px', xl: '180px', '2xl': '192px' }}
            padding={{ base: '24px 24px 20px 24px', md: '16px' }}
            justifyContent='space-between'
        >
            <Flex direction='column' gap='8px' minWidth={0}>
                <Typography
                    Size={isTabletMobile ? TypographySizes.md : TypographySizes.xl}
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                >
                    {title}
                </Typography>

                <Typography
                    Size={TypographySizes.sm}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    noOfLines={3}
                >
                    {description}
                </Typography>
            </Flex>
            <Flex width='100%' alignItems='center' justifyContent='space-between'>
                <CardBadge size='medium' type='dishType' dishType={dishType} bgColor='yellow' />
                <Flex>
                    <ReactionCount size='small' count={1} variant='bookmark' />
                    <ReactionCount size='small' count={1} variant='emoji' />
                </Flex>
            </Flex>
        </Card>
    );
};
