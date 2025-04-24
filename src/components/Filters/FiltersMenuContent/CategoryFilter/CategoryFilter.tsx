import { Select } from '@chakra-ui/icons';
import { ChangeEvent } from 'react';

import { navBarData } from '~/shared/data/navBarData';
import { useAppDispatch } from '~/store/hooks';
import { setCategoriesFilter } from '~/store/recipesListPage-slice';

export const CategoryFilter = () => {
    const dispatch = useAppDispatch();

    const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedCategory = navBarData.filter((el) => el.title === event.target.value)[0]
            .general;
        dispatch(setCategoriesFilter([selectedCategory, '']));
    };

    const mappedOptions = navBarData.map((el) => (
        <option
            data-test-id={el.title === 'Веганская кухня' && 'checkbox-веганская кухня'}
            key={'select' + el.title}
        >
            {el.title}
        </option>
    ));

    return (
        <Select onChange={handleCategoryChange} placeholder='Категория'>
            {mappedOptions}
        </Select>
    );
};
