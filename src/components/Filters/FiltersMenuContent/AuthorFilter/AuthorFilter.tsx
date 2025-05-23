import { Select } from '@chakra-ui/icons';
import { memo } from 'react';

import { authorsFilters } from '~/shared/constants/recipeFilters';

export const AuthorFilter = memo(() => {
    const mappedOptions = authorsFilters.map((el) => (
        <option key={'select' + el.title}>{el.title}</option>
    ));

    return <Select placeholder='Поиск по автору'>{mappedOptions}</Select>;
});
