import { Box, Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Recipe } from '~/shared/types/recipeTypes';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithImageProps {
    recipe: Recipe;
    categoryTitle: string;
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
    const { onClickHandler, recipe, categoryTitle } = props;

    const { screenSize, isDesktopLaptop, isTabletMobile } = useScreenSize();

    return (
        <Card
            margin='2px'
            onClick={onClickHandler}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            width={sizes[screenSize].width}
            height={sizes[screenSize].height}
            borderRadius='8px'
        >
            <Box
                borderTopRadius='8px'
                width='100%'
                height={sizes[screenSize].imgHeight}
                backgroundSize='100% 100%'
                backgroundImage={'https://training-api.clevertec.ru' + recipe.image}
                padding={sizes[screenSize].pdImage}
            >
                {isTabletMobile && (
                    <CardBadge
                        type='dishType'
                        size='small'
                        bgColor='green'
                        dishType={categoryTitle}
                    />
                )}
            </Box>
            <Box padding={sizes[screenSize].padding}>
                <Box
                    width={sizes[screenSize].textWidth}
                    height={sizes[screenSize].textHeight}
                    marginBottom='24px'
                >
                    <Typography
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={2}
                        Size={sizes[screenSize].textTitleSize}
                        overflowWrap='break-word'
                    >
                        {recipe.title}
                    </Typography>
                    {isDesktopLaptop && (
                        <Typography
                            Size={TypographySizes.sm}
                            overflow='hidden'
                            textOverflow='ellipsis'
                            noOfLines={3}
                        >
                            {recipe.description}
                        </Typography>
                    )}
                </Box>

                <Flex justifyContent='space-between' alignItems='center'>
                    {isDesktopLaptop && (
                        <CardBadge
                            type='dishType'
                            size='medium'
                            bgColor='green'
                            dishType={categoryTitle}
                        />
                    )}
                    <Flex width='max-content'>
                        <ReactionCount size='small' count={recipe.bookmarks} variant='bookmark' />
                        <ReactionCount size='small' count={recipe.likes} variant='emoji' />
                    </Flex>
                </Flex>
            </Box>
        </Card>
    );
});
