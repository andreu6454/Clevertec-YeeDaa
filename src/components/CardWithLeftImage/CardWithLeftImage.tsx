import { Box, Card, Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Recipe } from '~/shared/types/recipeTypes';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { searchInputSelector } from '~/store/recipesListPage-slice';

import BookmarkIcon from '../../assets/svg/bookmark.svg';

interface CardWithLeftImageProps {
    recipe: Recipe;
    onClickHandler?: () => void;
    index: number;
    categoryTitle: string;
}

const sizes = {
    Desktop: {
        width: '668px',
        height: '244px',
        imgWidth: '346px',
        textWidth: '274px',
        padding: '20px 24px',
        containerWidth: '322px',
        gap: '24px',
        textTitleSize: TypographySizes.xl,
    },
    Laptop: {
        width: '880px',
        height: '244px',
        imgWidth: '346px',
        textWidth: '486px',
        padding: '20px 24px',
        containerWidth: '534px',
        gap: '24px',
        textTitleSize: TypographySizes.xl,
    },
    Tablet: {
        width: '356px',
        height: '128px',
        imgWidth: '158px',
        textWidth: '182px',
        padding: '8px',
        containerWidth: '198px',
        gap: '0',
        textTitleSize: TypographySizes.md,
    },
    Mobile: {
        width: '328px',
        height: '128px',
        imgWidth: '158px',
        textWidth: '154px',
        padding: '8px',
        containerWidth: '170px',
        gap: '0',
        textTitleSize: TypographySizes.md,
    },
};

export const CardWithLeftImage = memo((props: CardWithLeftImageProps) => {
    const { onClickHandler, index, recipe, categoryTitle } = props;

    const { screenSize } = useScreenSize();

    const [isSmall, setIsSmall] = useState(screenSize === 'Mobile' || screenSize === 'Tablet');
    const searchInputValue = useAppSelector(searchInputSelector);

    useEffect(() => {
        setIsSmall(screenSize === 'Mobile' || screenSize === 'Tablet');
    }, [screenSize]);

    return (
        <Card
            data-test-id={`food-card-${index}`}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            width={sizes[screenSize].width}
            height={sizes[screenSize].height}
            direction='row'
            flexShrink={0}
            borderRadius='8px'
        >
            <Flex
                borderLeftRadius='8px'
                width={sizes[screenSize].imgWidth}
                height='100%'
                backgroundSize='100% 100%'
                backgroundImage={'https://training-api.clevertec.ru' + recipe.image}
                alignItems={!isSmall ? 'flex-end' : 'flex-start'}
                padding={sizes[screenSize].padding}
            >
                {/*{!isSmall && (*/}
                {/*    <CardBadge*/}
                {/*        size='medium'*/}
                {/*        type='recommendation'*/}
                {/*        bgColor='green'*/}
                {/*        avatar={ElenaAvatar}*/}
                {/*        name='Елена высоцкая'*/}
                {/*    />*/}
                {/*)}*/}
                {isSmall && (
                    <CardBadge
                        size='small'
                        type='dishType'
                        bgColor='yellow'
                        dishType={categoryTitle}
                    />
                )}
            </Flex>
            <Flex
                direction='column'
                gap={sizes[screenSize].gap}
                width={sizes[screenSize].containerWidth}
                height='100%'
                padding={sizes[screenSize].padding}
            >
                <Flex height='24px' justifyContent='space-between' alignItems='center'>
                    {!isSmall && (
                        <CardBadge
                            size='medium'
                            type='dishType'
                            bgColor='yellow'
                            dishType={categoryTitle}
                        />
                    )}
                    <Flex>
                        <ReactionCount size='small' variant='bookmark' count={recipe.bookmarks} />
                        <ReactionCount size='small' variant='emoji' count={recipe.likes} />
                    </Flex>
                </Flex>
                <Flex
                    direction='column'
                    width={sizes[screenSize].textWidth}
                    height='100px'
                    gap='8px'
                >
                    <Typography
                        Size={sizes[screenSize].textTitleSize}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={isSmall ? 2 : 1}
                    >
                        {recipe.title
                            .split(new RegExp(`(${searchInputValue})`, 'i'))
                            .map((part, i) =>
                                part.toLowerCase() === searchInputValue.toLowerCase() ? (
                                    <Box as='span' key={i} color='#2db100'>
                                        {part}
                                    </Box> //подсветка найденной части
                                ) : (
                                    part
                                ),
                            )}
                    </Typography>
                    {!isSmall && (
                        <Typography
                            Size={TypographySizes.sm}
                            overflow='hidden'
                            textOverflow='ellipsis'
                            noOfLines={3}
                        >
                            {recipe.description}
                        </Typography>
                    )}
                </Flex>
                <Flex justifyContent='flex-end' gap='8px'>
                    <Button
                        display='flex'
                        padding={isSmall ? '6px 0 6px 6px' : ''}
                        leftIcon={<Image src={BookmarkIcon} />}
                        size={!isSmall ? 'sm' : 'xs'}
                        variant='outline'
                        colorScheme='black'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {!isSmall && 'Сохранить'}
                    </Button>
                    <Button
                        data-test-id={`card-link-${index}`}
                        onClick={onClickHandler}
                        size={!isSmall ? 'sm' : 'xs'}
                        backgroundColor='#000'
                        color='#fff'
                    >
                        Готовить
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
});
