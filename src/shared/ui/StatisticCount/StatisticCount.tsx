import { HStack, Image } from '@chakra-ui/react';

import BookmarksIcon from '~/assets/svg/bookmark.svg';
import LikeIcon from '~/assets/svg/emojiHeartEyes.svg';
import SubscribersIcon from '~/assets/svg/peoples.svg';
import RecommendationIcon from '~/assets/svg/recommendation.svg';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type StatisticCountProps = {
    type: 'subscribes' | 'bookmarks' | 'likes' | 'recommendation';
    count: number;
};

export const StatisticCount = ({ type, count }: StatisticCountProps) => {
    const titles = {
        subscribes: 'подписчиков',
        bookmarks: 'сохранений',
        likes: 'лайков',
        recommendation: 'рекомендованных рецепта',
    };

    const images = {
        subscribes: SubscribersIcon,
        bookmarks: BookmarksIcon,
        likes: LikeIcon,
        recommendation: RecommendationIcon,
    };
    return (
        <HStack gap='6px'>
            <Image width='12px' height='12px' src={images[type]} />
            <Typography Size={TypographySizes.xs} fontWeight={600} color='#2db100'>
                {`${count} ${titles[type]}`}
            </Typography>
        </HStack>
    );
};
