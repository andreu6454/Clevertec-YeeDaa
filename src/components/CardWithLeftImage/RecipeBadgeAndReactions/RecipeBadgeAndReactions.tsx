import { Flex } from '@chakra-ui/react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';

type RecipeBadgeAndReactionProps = {
    bookmarks?: number;
    likes?: number;
    categoryTitle?: string;
};

export const RecipeBadgeAndReactions = (props: RecipeBadgeAndReactionProps) => {
    const { bookmarks, likes, categoryTitle } = props;

    const { isTabletMobile } = useScreenSize();

    return (
        <Flex height='24px' justifyContent='space-between' alignItems='center'>
            {!isTabletMobile && (
                <CardBadge
                    size='medium'
                    type='dishType'
                    bgColor='yellow'
                    dishType={categoryTitle}
                />
            )}
            <Flex>
                <ReactionCount size='small' variant='bookmark' count={bookmarks || 0} />
                <ReactionCount size='small' variant='emoji' count={likes || 0} />
            </Flex>
        </Flex>
    );
};
