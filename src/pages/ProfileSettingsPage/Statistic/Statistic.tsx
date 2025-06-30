import { Flex } from '@chakra-ui/react';

import { BookmarksStats } from '~/pages/ProfileSettingsPage/Statistic/BookmarksStats/BookmarksStats';
import { LikesStats } from '~/pages/ProfileSettingsPage/Statistic/LikesStats/LikesStats';
import { SubscribersStats } from '~/pages/ProfileSettingsPage/Statistic/SubscribersStats/SubscribersStats';
import { GetStatisticsResponse } from '~/query/types/types';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type StatisticProps = {
    subscribers: string[];
    statistic: GetStatisticsResponse;
};

export const Statistic = ({ subscribers, statistic }: StatisticProps) => (
    <Flex flexDirection='column' gap='16px'>
        <Typography Size={TypographySizes.xl} fontWeight={700}>
            Статистика
        </Typography>
        <SubscribersStats subscribers={subscribers} />
        <BookmarksStats bookmarks={statistic?.bookmarks} />
        <LikesStats likes={statistic?.likes} />
    </Flex>
);
