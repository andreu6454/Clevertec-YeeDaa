import { Box, Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { Recipe } from '~/shared/types/recipeTypes';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithImageProps {
    recipe: Recipe;
    categoryTitle: string;
    onClickHandler?: () => void;
}

export const CardWithImage = memo((props: CardWithImageProps) => {
    const { onClickHandler, recipe, categoryTitle } = props;

    const { isDesktopLaptop, isTabletMobile } = useScreenSize();

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
            width={{ base: '158px', xl: '277px', '2xl': '322px' }}
            height={{ base: '220px', xl: '414px' }}
            borderRadius='8px'
        >
            <Box
                borderTopRadius='8px'
                width='100%'
                height={{ base: '128px', xl: '230px' }}
                backgroundSize='100% 100%'
                backgroundImage={getImageUrl(recipe.image)}
                padding={{ base: '8px', xl: '20px 24px' }}
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
            <Box padding={{ base: '8px', xl: '12px' }}>
                <Box
                    width={{ base: '142px', xl: '253px', '2xl': '274px' }}
                    height={{ base: '48px', xl: '100px' }}
                    marginBottom='24px'
                >
                    <Typography
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={2}
                        Size={isTabletMobile ? TypographySizes.md : TypographySizes.xl}
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
