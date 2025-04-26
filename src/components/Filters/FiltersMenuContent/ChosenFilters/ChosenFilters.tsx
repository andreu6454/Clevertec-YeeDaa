import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { ChosenAllergens } from '~/components/Filters/FiltersMenuContent/ChosenFilters/ChosenAllergens/ChosenAllergens';
import { ChosenCategories } from '~/components/Filters/FiltersMenuContent/ChosenFilters/ChosenCategories/ChosenCategories';
import { ChosenMeatTags } from '~/components/Filters/FiltersMenuContent/ChosenFilters/ChosenMeatTags/ChosenMeatTags';
import { ChosenSideDishTags } from '~/components/Filters/FiltersMenuContent/ChosenFilters/ChosenSideDishTags/ChosenSideDishTags';

export const ChosenFilters = memo(() => (
    <Flex width='100%' gap='16px' flexWrap='wrap' alignItems='flex-end'>
        <ChosenMeatTags />
        <ChosenSideDishTags />
        <ChosenAllergens />
        <ChosenCategories />
    </Flex>
));
