import { Flex } from '@chakra-ui/react';

import { sideDishFilters } from '~/shared/data/recipeFilters';
import { CustomCheckbox } from '~/shared/ui/Checkbox/Checkbox';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSideDishFilters, sideDishFiltersSelector } from '~/store/recipesListPage-slice';

export const SideDishFilter = () => {
    const dispatch = useAppDispatch();
    const sideDishFiltersData = useAppSelector(sideDishFiltersSelector);

    const mappedFilters = sideDishFilters.map((el) => {
        const isChecked = sideDishFiltersData.includes(el.general);

        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(
                    setSideDishFilters(sideDishFiltersData.filter((item) => item !== el.general)),
                );
            } else {
                dispatch(setSideDishFilters([...sideDishFiltersData, el.general]));
            }
        };

        return (
            <CustomCheckbox
                title={el.title}
                key={el.title + 'checkbox'}
                onChangeHandler={onChangeHandler}
                isChecked={isChecked}
                dataTestId={el.title === 'Картошка' ? 'checkbox-картошка' : ''}
            />
        );
    });

    return (
        <Flex direction='column' gap='12px'>
            <Typography Size={TypographySizes.md}>Тип мяса:</Typography>
            {mappedFilters}
        </Flex>
    );
};
