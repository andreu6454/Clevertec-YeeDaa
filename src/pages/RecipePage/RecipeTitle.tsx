import { Box, Image } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';

import Bookmark from '~/assets/svg/bookmark.svg';
import Clock from '~/assets/svg/clock.svg';
import Like from '~/assets/svg/emojiHeartEyes.svg';
import { CardBadge } from '~/components/CardBadge/CardBadge';
import { recipeData } from '~/shared/data/recipeData';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface RecipeTitleProps {
    id: number;
}

export const RecipeTitle = (props: RecipeTitleProps) => {
    const { id } = props;

    const data = recipeData[id];

    const mappedCategories = data.category.map((category) => (
        <CardBadge
            key={category}
            size='medium'
            bgColor='yellow'
            type='dishType'
            dishType={category}
        />
    ));

    return (
        <Flex gap='24px'>
            <Image width='353px' height='410px' src={data.image} />
            <Flex width='503px' direction='column' justifyContent='space-beetwen'>
                <Flex height='100%' width='100%' direction='column' gap='32px'>
                    <Flex width='100%' justifyContent='space-between'>
                        <Flex gap='8px'>{mappedCategories}</Flex>
                        <Flex gap='8px'>
                            <ReactionCount size='small' count={data.bookmarks} variant='bookmark' />
                            <ReactionCount size='small' count={data.likes} variant='emoji' />
                        </Flex>
                    </Flex>
                    <Box>
                        <Text
                            width='437px'
                            fontWeight='700'
                            fontSize='48px'
                            lineHeight='100%'
                            marginBottom='24px'
                        >
                            {data.title}
                        </Text>
                        <Typography Size={TypographySizes.sm}>{data.description}</Typography>
                    </Box>
                </Flex>
                <Flex alignItems='flex-end' justifyContent='space-between'>
                    <Flex
                        padding='2px 8px'
                        backgroundColor='rgba(0, 0, 0, 0.06)'
                        borderRadius='4px'
                        gap='8px'
                        alignItems='center'
                    >
                        <Image width='16px' height='16px' src={Clock} />
                        <Typography Size={TypographySizes.sm}>{data.time}</Typography>
                    </Flex>
                    <Flex gap='12px'>
                        <Button
                            size='sm'
                            border='1px solid rgba(0, 0, 0, 0.48)'
                            variant='outline'
                            leftIcon={<Image width='14px' src={Like} />}
                        >
                            Оценить рецепт
                        </Button>
                        <Button
                            leftIcon={<Image width='14px' src={Bookmark} />}
                            size='sm'
                            backgroundColor='#b1ff2e'
                        >
                            Сохранить в закладки
                        </Button>
                    </Flex>
                </Flex>
            </Flex>
        </Flex>
    );
};
