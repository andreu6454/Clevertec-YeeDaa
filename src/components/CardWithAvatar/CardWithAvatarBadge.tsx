import { Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type CardWithAvatarBadgeProps = {
    newRecipesCount?: number;
    isFavorite?: boolean;
};
export const CardWithAvatarBadge = ({ newRecipesCount, isFavorite }: CardWithAvatarBadgeProps) => {
    if (!isFavorite || newRecipesCount === undefined) return null;

    const getRecipesText = (count: number) => {
        if (count % 10 === 1 && count % 100 !== 11) {
            return `${count} новый рецепт`;
        }
        if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
            return `${count} новых рецепта`;
        }
        return `${count} новых рецептов`;
    };

    return (
        <Flex
            data-test-id={DATA_TEST_IDS.blogsCardNewRecipesBadge}
            backgroundColor='rgba(0, 0, 0, 0.06)'
            borderRadius='4px'
            padding='2px 8px'
            position='absolute'
            top={1}
            right={1}
        >
            <Typography width='max-content' Size={TypographySizes.sm}>
                {getRecipesText(newRecipesCount)}
            </Typography>
        </Flex>
    );
};

export default CardWithAvatarBadge;
