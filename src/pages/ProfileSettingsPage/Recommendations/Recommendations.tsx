import { Flex } from '@chakra-ui/react';

import { RecommendationEnableBlock } from '~/components/RecommendationEnableBlock/RecommendationEnableBlock';
import { RecommendedRecipes } from '~/pages/ProfileSettingsPage/Recommendations/RecommendedRecipes/RecommendedRecipes';
import { GetStatisticsResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { checkEnableRecommendation } from '~/shared/utils/checkEnableRecommendation';
import { getReactionCount } from '~/shared/utils/getReactionCount';

type RecommendationsProps = {
    subscribersCount: number;
    statistic: GetStatisticsResponse;
};

export const Recommendations = ({ subscribersCount, statistic }: RecommendationsProps) => {
    const bookmarksCount = getReactionCount(statistic?.bookmarks);
    const isRecommendationsEnable = checkEnableRecommendation(subscribersCount, bookmarksCount);

    if (!isRecommendationsEnable) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.settingsRecommendationInfoBlock}
            flexDirection='column'
            gap='20px'
        >
            <RecommendationEnableBlock
                subscribersCount={subscribersCount}
                bookmarksCount={bookmarksCount}
            />
            <RecommendedRecipes recipes={statistic?.recipesWithRecommendations} />
        </Flex>
    );
};
