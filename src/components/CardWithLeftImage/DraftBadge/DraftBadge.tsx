import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const DraftBadge = () => (
    <Flex width='100%' justifyContent='flex-end'>
        <Flex backgroundColor='rgba(0, 0, 0, 0.06)' borderRadius='4px' padding='2px 8px'>
            <Typography Size={TypographySizes.sm}>Черновик</Typography>
        </Flex>
    </Flex>
);
