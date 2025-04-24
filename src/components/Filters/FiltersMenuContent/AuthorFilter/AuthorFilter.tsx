import { Select } from '@chakra-ui/icons';

import { authorsFilters } from '~/shared/data/recipeFilters';

export const AuthorFilter = () => {
    const mappedOptions = authorsFilters.map((el) => (
        <option key={'select' + el.title}>{el.title}</option>
    ));

    return <Select placeholder='Поиск по автору'>{mappedOptions}</Select>;
};
