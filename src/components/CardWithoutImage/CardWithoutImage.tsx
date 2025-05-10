import { Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithoutImageProps {
    title: string;
    description: string;
    dishType: string;
    size: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile';
    onClick?: () => void;
}

const sizes = {
    Desktop: {
        width: '322px',
        height: '192px',
        padding: '24px 24px 20px 24px',
        textTitleSize: TypographySizes.xl,
    },
    Laptop: {
        width: '282px',
        height: '180px',
        padding: '16px 16px 16px 16px',
        textTitleSize: TypographySizes.xl,
    },
    Tablet: {
        width: '232px',
        height: '168px',
        padding: '16px 16px 16px 16px',
        textTitleSize: TypographySizes.md,
    },
    Mobile: {
        width: '328px',
        height: '168px',
        padding: '16px 16px 16px 16px',
        textTitleSize: TypographySizes.md,
    },
};

export const CardWithoutImage = (props: CardWithoutImageProps) => {
    const { title, description, dishType, size, onClick } = props;
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
            width={sizes[size].width}
            height={sizes[size].height}
            padding={sizes[size].padding}
            justifyContent='space-between'
        >
            <Flex direction='column' gap='8px' minWidth={0}>
                <Typography
                    Size={sizes[size].textTitleSize}
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
