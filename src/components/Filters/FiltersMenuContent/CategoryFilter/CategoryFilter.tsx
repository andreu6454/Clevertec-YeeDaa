import { Select } from '@chakra-ui/icons';

import { navBarData } from '~/shared/data/navBarData';

export const CategoryFilter = () => {
    const mappedOptions = navBarData.map((el) => {
        if (el.title === 'Веганская кухня') {
            return (
                <option data-test-id='checkbox-веганская кухня' key={'select' + el.title}>
                    {el.title}
                </option>
            );
        }
        return <option key={'select' + el.title}>{el.title}</option>;
    });

    return <Select placeholder='Категория'>{mappedOptions}</Select>;
};
