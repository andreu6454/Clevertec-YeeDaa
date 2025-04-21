import { Select, Switch } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const AllergensFilter = () => (
    <Flex direction='column' gap='8px'>
        <Flex padding='6px 0 6px 8px' gap='12px' alignItems='center'>
            <Typography Size={TypographySizes.md}>Исключить мои аллергены</Typography>
            <Switch data-test-id='allergens-switcher-filter' size='md' />
        </Flex>

        <Select
            data-test-id='allergens-menu-button-filter'
            placeholder='Выберите из списка аллергенов...'
        />
    </Flex>
);
