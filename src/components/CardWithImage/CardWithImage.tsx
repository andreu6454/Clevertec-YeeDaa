import { Box, Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import AlexAvatar from '../../assets/images/alexAvatar.png';

interface CardWithImageProps {
    title: string;
    image: string;
    dishType: string;
    size: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
    description: string;
    bookMarks: number;
    likes: number;
    onClickHandler?: () => void;
}

const sizes = {
    Mobile: {
        width: '158px',
        height: '220px',
        imgHeight: '128px',
        padding: '8px',
        pdImage: '8px',
        textTitleSize: TypographySizes.md,
        textWidth: '142px',
        textHeight: '48px',
    },
    Tablet: {
        width: '158px',
        height: '220px',
        imgHeight: '128px',
        padding: '8px',
        pdImage: '8px',
        textTitleSize: TypographySizes.md,
        textWidth: '142px',
        textHeight: '48px',
    },
    Laptop: {
        width: '277px',
        height: '402px',
        imgHeight: '230px',
        padding: '12px',
        pdImage: '20px 24px',
        textTitleSize: TypographySizes.xl,
        textWidth: '253px',
        textHeight: '100px',
    },
    Desktop: {
        width: '322px',
        height: '414px',
        imgHeight: '230px',
        padding: '12px',
        pdImage: '20px 24px',
        textTitleSize: TypographySizes.xl,
        textWidth: '274px',
        textHeight: '100px',
    },
};

export const CardWithImage = memo((props: CardWithImageProps) => {
    const { title, image, dishType, size, description, onClickHandler, bookMarks, likes } = props;

    return (
        <Card
            onClick={onClickHandler}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            width={sizes[size].width}
            height={sizes[size].height}
            borderRadius='8px'
        >
            <Box
                borderTopRadius='8px'
                width='100%'
                height={sizes[size].imgHeight}
                backgroundSize='100% 100%'
                backgroundImage={image}
                padding={sizes[size].pdImage}
            >
                {(size === 'Tablet' || size === 'Mobile') && (
                    <CardBadge type='dishType' size='small' bgColor='green' dishType={dishType} />
                )}
                {(size === 'Desktop' || size === 'Laptop') && (
                    <CardBadge
                        type='recommendation'
                        size='small'
                        bgColor='green'
                        avatar={AlexAvatar}
                        name='Alex Cook'
                    />
                )}
            </Box>
            <Box padding={sizes[size].padding}>
                <Box
                    width={sizes[size].textWidth}
                    height={sizes[size].textHeight}
                    marginBottom='24px'
                >
                    <Typography
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={2}
                        Size={sizes[size].textTitleSize}
                        overflowWrap='break-word'
                    >
                        {title}
                    </Typography>
                    {(size === 'Desktop' || size === 'Laptop') && (
                        <Typography
                            Size={TypographySizes.sm}
                            overflow='hidden'
                            textOverflow='ellipsis'
                            noOfLines={3}
                        >
                            {description}
                        </Typography>
                    )}
                </Box>

                <Flex justifyContent='space-between' alignItems='center'>
                    {(size === 'Desktop' || size === 'Laptop') && (
                        <CardBadge
                            type='dishType'
                            size='medium'
                            bgColor='green'
                            dishType={dishType}
                        />
                    )}
                    <Flex width='max-content'>
                        <ReactionCount size='small' count={bookMarks} variant='bookmark' />
                        <ReactionCount size='small' count={likes} variant='emoji' />
                    </Flex>
                </Flex>
            </Box>
        </Card>
    );
});
