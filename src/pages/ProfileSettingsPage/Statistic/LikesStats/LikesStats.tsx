import { Flex } from '@chakra-ui/react';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';

import { ReactionType } from '~/shared/types/usersTypes';
import { StatisticCount } from '~/shared/ui/StatisticCount/StatisticCount';
import { getGroupByWeekStats } from '~/shared/utils/getGroupByWeekStats';
import { getReactionCount } from '~/shared/utils/getReactionCount';

type LikesStatsProps = {
    likes: ReactionType[];
};

export const LikesStats = ({ likes }: LikesStatsProps) => {
    const likesCount = getReactionCount(likes);
    const gropedData = getGroupByWeekStats(likes);

    return (
        <Flex
            flexDirection='column'
            gap='16px'
            overflowX='scroll'
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
        >
            <StatisticCount type='likes' count={likesCount} />
            {!!likesCount && (
                <LineChart data={gropedData} width={880} height={304}>
                    <CartesianGrid />
                    <Line dataKey='count' stroke='#8c54ff' strokeWidth={2} />
                    <Tooltip
                        formatter={(value) => [value, 'Количество']}
                        labelFormatter={(label) => `Неделя: ${label}`}
                    />
                    <XAxis
                        dataKey='date'
                        tick={({ x, y, payload, index }) => {
                            if (index === 0) return <g />;
                            return (
                                <text x={x} y={y + 16} textAnchor='middle' fill='#666'>
                                    {payload.value}
                                </text>
                            );
                        }}
                    />
                    <YAxis ticks={[0, 20, 40, 60, 80, 100, 120]} />
                </LineChart>
            )}
        </Flex>
    );
};
