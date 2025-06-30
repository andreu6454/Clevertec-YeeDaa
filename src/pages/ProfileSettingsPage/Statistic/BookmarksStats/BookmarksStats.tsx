import { Flex } from '@chakra-ui/react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { ReactionType } from '~/shared/types/usersTypes';
import { StatisticCount } from '~/shared/ui/StatisticCount/StatisticCount';
import { getGroupByWeekStats } from '~/shared/utils/getGroupByWeekStats';
import { getReactionCount } from '~/shared/utils/getReactionCount';

type BookmarksStatsProps = {
    bookmarks: ReactionType[];
};
export const BookmarksStats = ({ bookmarks }: BookmarksStatsProps) => {
    const bookmarksCount = getReactionCount(bookmarks);
    const gropedData = getGroupByWeekStats(bookmarks);

    return (
        <Flex
            flexDirection='column'
            gap='16px'
            overflowX='auto'
            width={{ base: '100%', xl: 'max-content' }}
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            <StatisticCount type='bookmarks' count={bookmarksCount} />
            {!!bookmarksCount && (
                <LineChart data={gropedData} width={880} height={304}>
                    <CartesianGrid />
                    <Line dataKey='count' stroke='#2db100' strokeWidth={2} />
                    <Tooltip
                        formatter={(value) => [value, 'Количество']}
                        labelFormatter={(label) => `Неделя: ${label}`}
                    />
                    <XAxis dataKey='date' interval={0} />
                    <YAxis ticks={[0, 20, 40, 60, 80, 100, 120]} />
                </LineChart>
            )}
        </Flex>
    );
};
