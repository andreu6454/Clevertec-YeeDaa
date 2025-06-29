import { Box } from '@chakra-ui/icons';

import { useGetProfileQuery, useGetStatisticQuery } from '~/query/services/users';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { checkEnableRecommendation } from '~/shared/utils/checkEnableRecommendation';
import { getReactionCount } from '~/shared/utils/getReactionCount';

export const ReactionsBar = () => {
    const { isDesktop, isTablet, isLaptop } = useScreenSize();
    const paddingsReactionBox = isTablet ? '0 16px' : '0 8px';

    const { data: StatisticData } = useGetStatisticQuery();
    const { data: ProfileData } = useGetProfileQuery();

    const bookmarks = getReactionCount(StatisticData?.bookmarks || []);
    const likes = getReactionCount(StatisticData?.likes || []);
    const subscribersCount = ProfileData?.subscribers?.length || 0;
    const enableRecommendation = checkEnableRecommendation(subscribersCount, bookmarks);

    if (isDesktop || isLaptop) {
        return (
            <Box
                data-test-id={DATA_TEST_IDS.userStatsBlock}
                width='208px'
                height='200px'
                display='flex'
                flexDirection='column'
                padding='16px 56px'
                gap='24px'
            >
                {enableRecommendation && (
                    <ReactionCount
                        size='large'
                        variant='recommendation'
                        count={StatisticData?.recommendationsCount || 0}
                    />
                )}
                <ReactionCount size='large' variant='bookmark' count={bookmarks} />
                <ReactionCount size='large' variant='people' count={subscribersCount} />
                <ReactionCount size='large' variant='emoji' count={likes} />
            </Box>
        );
    }

    return (
        <Box
            data-test-id={DATA_TEST_IDS.userStatsBlock}
            display='flex'
            padding={paddingsReactionBox}
        >
            {enableRecommendation && (
                <ReactionCount
                    size='small'
                    variant='recommendation'
                    count={StatisticData?.recommendationsCount || 0}
                />
            )}
            <ReactionCount size='small' variant='bookmark' count={bookmarks} />
            <ReactionCount size='small' variant='people' count={subscribersCount} />
            <ReactionCount size='small' variant='emoji' count={likes} />
        </Box>
    );
};
