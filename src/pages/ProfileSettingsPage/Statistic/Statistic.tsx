import { Flex } from '@chakra-ui/react';

import { BookmarksStats } from '~/pages/ProfileSettingsPage/Statistic/BookmarksStats/BookmarksStats';
import { LikesStats } from '~/pages/ProfileSettingsPage/Statistic/LikesStats/LikesStats';
import { SubscribersStats } from '~/pages/ProfileSettingsPage/Statistic/SubscribersStats/SubscribersStats';
import { useGetStatisticQuery } from '~/query/services/users';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type StatisticProps = {
    subscribers: string[];
};

export const Statistic = ({ subscribers }: StatisticProps) => {
    const { data: StatisticData } = useGetStatisticQuery();

    if (!StatisticData) return null;
    return (
        <Flex flexDirection='column' gap='16px'>
            <Typography Size={TypographySizes.xl} fontWeight={700}>
                Статистика
            </Typography>
            <SubscribersStats subscribers={subscribers} />
            <BookmarksStats bookmarks={StatisticData?.bookmarks} />
            <LikesStats likes={StatisticData?.likes} />
        </Flex>
    );
};
