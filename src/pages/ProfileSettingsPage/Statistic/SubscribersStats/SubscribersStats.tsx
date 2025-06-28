import { Flex } from '@chakra-ui/react';

import { SubscriberCard } from '~/components/SubscriberCard/SubscriberCard';
import { useGetAllUsersQuery } from '~/query/services/users';
import { StatisticCount } from '~/shared/ui/StatisticCount/StatisticCount';

type SubscribersStatsProps = {
    subscribers: string[];
};

export const SubscribersStats = ({ subscribers }: SubscribersStatsProps) => {
    const { data: AllUsers } = useGetAllUsersQuery();

    const subscribedUsers = AllUsers?.filter((user) => subscribers.includes(user.id));

    const mappedSubscribers = subscribedUsers?.map((user) => (
        <SubscriberCard
            key={user.id}
            fullName={`${user.firstName} ${user.lastName}`}
            avatar={user.photo}
            login={user.login}
        />
    ));

    return (
        <Flex flexDirection='column' gap='16px'>
            <StatisticCount type='subscribes' count={subscribers.length} />
            {!!subscribedUsers?.length && (
                <Flex width='100%' flexWrap='wrap' justifyContent='space-between' gap='12px'>
                    {mappedSubscribers}
                </Flex>
            )}
        </Flex>
    );
};
