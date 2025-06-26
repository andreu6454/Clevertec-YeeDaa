import { Box, Card } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { DraftBadge } from '~/components/CardWithLeftImage/DraftBadge/DraftBadge';
import { EditButton } from '~/components/CardWithLeftImage/EditButton/EditButton';
import { RecipeBadgeAndReactions } from '~/components/CardWithLeftImage/RecipeBadgeAndReactions/RecipeBadgeAndReactions';
import { SaveAndBookmarkButtons } from '~/components/CardWithLeftImage/SaveAndBookmarkButtons/SaveAndBookmarkButtons';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { DraftType, Recipe } from '~/shared/types/recipeTypes';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';
import { useAppSelector } from '~/store/hooks';
import { searchInputSelector } from '~/store/slices/recipesListPage-slice';

interface CardWithLeftImageProps {
    recipe: Recipe | DraftType;
    index?: number;
    onClickHandler?: () => void;
    categoryTitle?: string;
    isDraft?: boolean;
    isAuthor?: boolean;
    isBookmarked?: boolean;
}

export const CardWithLeftImage = memo((props: CardWithLeftImageProps) => {
    const {
        onClickHandler,
        index,
        recipe,
        categoryTitle,
        isDraft = false,
        isAuthor = false,
        isBookmarked = false,
    } = props;

    const { isTabletMobile } = useScreenSize();

    const searchInputValue = useAppSelector(searchInputSelector);

    const recipeTitle = recipe.title
        .split(new RegExp(`(${searchInputValue})`, 'i'))
        .map((part, i) =>
            part.toLowerCase() === searchInputValue.toLowerCase() ? (
                <Box as='span' key={i} color='#2db100'>
                    {part}
                </Box>
            ) : (
                part
            ),
        );

    return (
        <Card
            data-test-id={`food-card-${index}`}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            width={{ base: '100%', md: '48%', xl: '100%', '2xl': '49%' }}
            height={{ base: '128px', xl: '244px' }}
            direction='row'
            flexShrink={0}
            borderRadius='8px'
        >
            {recipe?.image ? (
                <Flex
                    backgroundImage={getImageUrl(recipe?.image)}
                    height='100%'
                    backgroundSize='100% 100%'
                    width={{ base: '158px', xl: '346px' }}
                    padding={{ base: '8px', xl: '20px 24px' }}
                    alignItems={!isTabletMobile ? 'flex-end' : 'flex-start'}
                    borderLeftRadius='8px'
                    flexShrink={0}
                >
                    {isTabletMobile && (
                        <CardBadge
                            size='small'
                            type='dishType'
                            bgColor='yellow'
                            dishType={categoryTitle}
                        />
                    )}
                </Flex>
            ) : (
                <UploadImage height='100%' width={{ base: '158px', xl: '346px' }} flexShrink={0} />
            )}

            <Flex
                direction='column'
                gap={{ base: 0, xl: '24px' }}
                width='100%'
                height='100%'
                padding={{ base: '8px', xl: '20px 24px' }}
                justifyContent='space-between'
            >
                {isDraft && <DraftBadge />}
                {'bookmarks' in recipe && !isDraft && (
                    <RecipeBadgeAndReactions
                        categoryTitle={categoryTitle}
                        bookmarks={recipe?.bookmarks}
                        likes={recipe?.likes}
                    />
                )}

                <Flex
                    direction='column'
                    width={{ base: '154px', md: '182px', xl: '486px', '2xl': '274px' }}
                    height='100px'
                    gap='8px'
                >
                    <Typography
                        Size={isTabletMobile ? TypographySizes.md : TypographySizes.xl}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={isTabletMobile ? 2 : 1}
                    >
                        {recipeTitle}
                    </Typography>
                    {!isTabletMobile && (
                        <Typography
                            Size={TypographySizes.sm}
                            overflow='hidden'
                            textOverflow='ellipsis'
                            noOfLines={3}
                        >
                            {recipe.description ? recipe.description : '...'}
                        </Typography>
                    )}
                </Flex>
                {!isAuthor && (
                    <SaveAndBookmarkButtons
                        index={index}
                        onClickHandler={onClickHandler}
                        id={recipe._id}
                        isBookmarked={isBookmarked}
                    />
                )}
                {isAuthor && (
                    <EditButton id={recipe._id} onEditHandler={onClickHandler} isDraft={isDraft} />
                )}
            </Flex>
        </Card>
    );
});
