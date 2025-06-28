import { Button, Flex, HStack, Image, Text } from '@chakra-ui/react';

import RecommendationImage from '~/assets/recommendation.png';
import RecommendationIcon from '~/assets/svg/recommendationYellow.svg';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type RecommendationEnableBlockProps = {
    bookmarksCount: number;
    subscribersCount: number;
};

export const RecommendationEnableBlock = ({
    bookmarksCount,
    subscribersCount,
}: RecommendationEnableBlockProps) => (
    <Flex
        width={{ base: '100%', xl: '880px', '2xl': '1129px' }}
        backgroundColor='#d7ff94'
        padding={{ base: '16px', xl: '24px' }}
        borderRadius='16px'
        flexDirection={{ base: 'column', md: 'row' }}
        alignItems='center'
        justifyContent='space-between'
    >
        <Image
            mixBlendMode='multiply'
            width={{ base: '108px', xl: '206px' }}
            src={RecommendationImage}
        />
        <Flex
            flexDirection='column'
            gap={{ base: '16px', md: '24px' }}
            width={{ base: '100%', md: '384px', xl: '462px', '2xl': '535px' }}
        >
            <Text
                fontWeight='600'
                fontSize={{ base: '20px', xl: '36px' }}
                lineHeight={{ base: '28px', lg: '40px' }}
            >
                Теперь вы можете рекомендовать рецепты других авторов
            </Text>
            <Flex gap='8px' flexWrap='wrap'>
                <Typography Size={TypographySizes.md}>
                    Это можно будет сделать с помощью кнопки
                </Typography>
                <Button
                    size={{ base: 'xs', xl: 'sm' }}
                    width='max-content'
                    backgroundColor='#000'
                    color='#fff'
                    leftIcon={<Image fill='#ffffd3' src={RecommendationIcon} />}
                >
                    Рекомендовать рецепт
                </Button>
            </Flex>
        </Flex>
        <HStack
            position='relative'
            top={{ base: '-290px', md: -14, xl: -24 }}
            right={{ base: -28, md: 0 }}
        >
            <ReactionCount count={bookmarksCount} size='small' variant='bookmark' />
            <ReactionCount count={subscribersCount} size='small' variant='peopleUnfilled' />
        </HStack>
    </Flex>
);
