import { Box, Image } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import Bookmark from '~/assets/svg/bookmark.svg';
import Clock from '~/assets/svg/clock.svg';
import Like from '~/assets/svg/emojiHeartEyes.svg';
import { CardBadge } from '~/components/CardBadge/CardBadge';
import { DeleteAndEditButtons } from '~/pages/RecipePage/RecipeTitle/DeleteAndEditButtons';
import { useBookmarkRecipeMutation, useLikeRecipeMutation } from '~/query/services/recipes';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

interface RecipeTitleProps {
    category: Array<string>;
    image: string;
    bookmarks: number;
    likes: number;
    title: string;
    time: string;
    id: string;
    description: string;
    authorId: string;
    subCategoryId: string;
}

const sizes = {
    Desktop: {
        imgWidth: '553px',
        imgHeight: '410px',
        gap: '24px',
        categoriesWidth: '600px',
        width: '783px',
        textWidth: '437px',
        descWidth: '437px',
        btnSize: 'lg',
        titleFS: '48px',
        titleLH: '100%',
        titleMB: '24px',
        descMB: '',
    },
    Laptop: {
        imgWidth: '353px',
        imgHeight: '410px',
        gap: '24px',
        categoriesWidth: '380px',
        width: '503px',
        textWidth: '437px',
        descWidth: '437px',
        btnSize: 'sm',
        titleFS: '48px',
        titleLH: '100%',
        titleMB: '24px',
        descMB: '',
    },
    Tablet: {
        imgWidth: '232px',
        imgHeight: '224px',
        gap: '16px',
        categoriesWidth: '370px',
        width: '480px',
        textWidth: '437px',
        descWidth: '480px',
        btnSize: 'xs',
        titleFS: '24px',
        titleLH: '133%',
        titleMB: '16px',
        descMB: '24px',
    },
    Mobile: {
        imgWidth: '328px',
        imgHeight: '224px',
        gap: '16px',
        categoriesWidth: '220px',
        width: '328px',
        textWidth: '328px',
        descWidth: '328px',
        btnSize: 'xs',
        titleFS: '24px',
        titleLH: '133%',
        titleMB: '16px',
        descMB: '24px',
    },
};

export const RecipeTitle = memo((props: RecipeTitleProps) => {
    const {
        category,
        image,
        bookmarks,
        likes,
        title,
        description,
        time,
        id,
        authorId,
        subCategoryId,
    } = props;

    const { screenSize } = useScreenSize();

    const mappedCategories = category.map((category) => (
        <CardBadge
            key={category}
            size='medium'
            bgColor='yellow'
            type='dishType'
            dishType={category}
        />
    ));

    const userId = useAppSelector(userIdSelector);
    const isAuthor = userId === authorId;

    const [like] = useLikeRecipeMutation();
    const [bookmark] = useBookmarkRecipeMutation();

    const errorAlert = useAlertToast();

    const onLikeHandle = async () => {
        try {
            await like(id).unwrap();
        } catch (error) {
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                errorAlert(NEW_RECIPE_ALERTS.serverError, false);
            }
        }
    };

    const onBookmarkHandle = async () => {
        try {
            await bookmark(id).unwrap();
        } catch (error) {
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                errorAlert(NEW_RECIPE_ALERTS.serverError, false);
            }
        }
    };

    return (
        <Flex direction={screenSize === 'Mobile' ? 'column' : 'row'} gap={sizes[screenSize].gap}>
            <Image
                borderRadius='8px'
                width={sizes[screenSize].imgWidth}
                height={sizes[screenSize].imgHeight}
                src={getImageUrl(image)}
            />
            <Flex width={sizes[screenSize].width} direction='column' justifyContent='space-beetwen'>
                <Flex height='100%' width='100%' direction='column' gap='32px'>
                    <Flex width='100%' justifyContent='space-between'>
                        <Flex
                            flexWrap='wrap'
                            maxWidth={sizes[screenSize].categoriesWidth}
                            gap='8px'
                        >
                            {mappedCategories}
                        </Flex>
                        <Flex gap='8px'>
                            <ReactionCount size='small' count={bookmarks} variant='bookmark' />
                            <ReactionCount size='small' count={likes} variant='emoji' />
                        </Flex>
                    </Flex>
                    <Box>
                        <Text
                            width={sizes[screenSize].textWidth}
                            fontWeight='700'
                            fontSize={sizes[screenSize].titleFS}
                            lineHeight={sizes[screenSize].titleLH}
                            marginBottom={sizes[screenSize].titleMB}
                            noOfLines={3}
                            overflow='hidden'
                        >
                            {title}
                        </Text>
                        <Typography
                            width={sizes[screenSize].descWidth}
                            Size={TypographySizes.sm}
                            marginBottom={sizes[screenSize].descMB}
                        >
                            {description}
                        </Typography>
                    </Box>
                </Flex>
                <Flex
                    alignItems={screenSize === 'Mobile' ? 'flex-start' : 'flex-end'}
                    justifyContent='space-between'
                    direction={screenSize === 'Mobile' ? 'column' : 'row'}
                    gap={screenSize === 'Mobile' ? '12px' : ''}
                >
                    <Flex
                        padding='2px 8px'
                        backgroundColor='rgba(0, 0, 0, 0.06)'
                        borderRadius='4px'
                        gap='8px'
                        alignItems='center'
                    >
                        <Image width='16px' height='16px' src={Clock} />
                        <Typography Size={TypographySizes.sm}>{`${time} минут`}</Typography>
                    </Flex>
                    {isAuthor ? (
                        <DeleteAndEditButtons subCategoryId={subCategoryId} recipeId={id} />
                    ) : (
                        <Flex gap='12px'>
                            <Button
                                onClick={onLikeHandle}
                                size={sizes[screenSize].btnSize}
                                border='1px solid rgba(0, 0, 0, 0.48)'
                                variant='outline'
                                leftIcon={<Image width='14px' src={Like} />}
                            >
                                Оценить рецепт
                            </Button>
                            <Button
                                onClick={onBookmarkHandle}
                                leftIcon={<Image width='14px' src={Bookmark} />}
                                size={sizes[screenSize].btnSize}
                                backgroundColor='#b1ff2e'
                            >
                                Сохранить в закладки
                            </Button>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
});
