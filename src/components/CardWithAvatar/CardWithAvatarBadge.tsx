import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type CardWithAvatarBadgeProps = {
    newRecipesCount?: number;
    isFavorite?: boolean;
};
export const CardWithAvatarBadge = ({ newRecipesCount, isFavorite }: CardWithAvatarBadgeProps) => {
    if (!isFavorite || newRecipesCount === undefined) return null;
    return (
        <Flex
            backgroundColor='rgba(0, 0, 0, 0.06)'
            borderRadius='4px'
            padding='2px 8px'
            position='absolute'
            top={1}
            right={1}
        >
            <Typography width='max-content' Size={TypographySizes.sm}>
                {`${newRecipesCount} новых рецептов`}
            </Typography>
        </Flex>
    );
};

export default CardWithAvatarBadge;
