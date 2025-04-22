import { Box } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs';
import { pathNames } from '~/widgets/header/pathNames';
import { NavbarData } from '~/widgets/navbar/NavbarData/NavbarData';

export const BurgerMenuContent = () => (
    <Flex direction='column' width='100%' height='100%' paddingTop='16px'>
        <Box paddingX='20px' marginY='12px'>
            <Breadcrumbs pathNames={pathNames} />
        </Box>
        <Box height='100%'>
            <NavbarData data-test-id='nav' />
        </Box>
    </Flex>
);
