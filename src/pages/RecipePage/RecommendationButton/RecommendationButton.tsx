import { Button, Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import RecommendationIcon from '~/assets/svg/recommendation.svg';
import RecommendationYellowIcon from '~/assets/svg/recommendationYellow.svg';
import { useRecommendRecipeMutation } from '~/query/services/recipes';
import { useGetProfileQuery, useGetStatisticQuery } from '~/query/services/users';
import { checkEnableRecommendation } from '~/shared/utils/checkEnableRecommendation';
import { getReactionCount } from '~/shared/utils/getReactionCount';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

type RecommendationButtonProps = {
    recipeId: string;
    recommendedByUserId: string[];
};

export const RecommendationButton = ({
    recipeId,
    recommendedByUserId,
}: RecommendationButtonProps) => {
    const [isRecommended, setIsRecommended] = useState(false);

    const { data: ProfileData, isLoading: isLoadingProfileData } = useGetProfileQuery();
    const { data: StatisticData, isLoading: isLoadingStatisticData } = useGetStatisticQuery();
    const [recommend] = useRecommendRecipeMutation();
    const userId = useAppSelector(userIdSelector);

    useEffect(() => {
        if (recommendedByUserId?.includes(userId)) {
            setIsRecommended(true);
        }
    }, [recommendedByUserId]);

    if (isLoadingProfileData || isLoadingStatisticData) return null;

    const bookmarksCount = getReactionCount(StatisticData?.bookmarks || []);

    const isRecommendationsEnable = checkEnableRecommendation(
        ProfileData?.subscribers?.length || 0,
        bookmarksCount,
    );

    const onRecommendHandler = async () => {
        try {
            await recommend(recipeId).unwrap();
            setIsRecommended((prev) => !prev);
        } catch {
            console.log('ошибка');
        }
    };

    if (!isRecommendationsEnable) return null;

    if (isRecommended)
        return (
            <Button
                onClick={onRecommendHandler}
                width={{ base: '100%', md: '604px', xl: '578px', '2xl': '668px' }}
                backgroundColor='transparent'
                color='#000'
                leftIcon={<Image src={RecommendationIcon} />}
                border='1px solid rgba(0, 0, 0, 0.48)'
            >
                Вы порекомендовали
            </Button>
        );
    return (
        <Button
            onClick={onRecommendHandler}
            width={{ base: '100%', md: '604px', xl: '578px', '2xl': '668px' }}
            backgroundColor='#000'
            color='#fff'
            leftIcon={<Image src={RecommendationYellowIcon} />}
        >
            Рекомендовать рецепт
        </Button>
    );
};
