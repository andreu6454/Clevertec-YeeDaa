import { Box } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs';
import { allCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';
import { NavbarData } from '~/widgets/navbar/NavbarData/NavbarData';

export const BurgerMenuContent = () => {
    const allCategories = useAppSelector(allCategoriesSelector);

    return (
        <Flex onClick={(e) => e.stopPropagation()} direction='column' width='100%' height='100%'>
            <Box paddingX='20px' marginY='12px'>
                <Breadcrumbs pathNames={allCategories} />
            </Box>
            <Box height='100%'>
                <NavbarData data-test-id='nav' />
            </Box>
        </Flex>
    );
};
