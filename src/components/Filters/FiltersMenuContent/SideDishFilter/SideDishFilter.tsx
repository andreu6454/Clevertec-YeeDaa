import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { sideDishFilters } from '~/shared/constants/recipeFilters';
import { CustomCheckbox } from '~/shared/ui/Checkbox/Checkbox';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSideDishFilters, sideDishFiltersSelector } from '~/store/slices/recipesListPage-slice';

export const SideDishFilter = memo(() => {
    const dispatch = useAppDispatch();
    const sideDishFiltersData = useAppSelector(sideDishFiltersSelector);

    const mappedFilters = sideDishFilters.map((el) => {
        const isChecked = sideDishFiltersData.includes(el.title);

        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(
                    setSideDishFilters(sideDishFiltersData.filter((item) => item !== el.title)),
                );
            } else {
                dispatch(setSideDishFilters([...sideDishFiltersData, el.title]));
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
            <Typography Size={TypographySizes.md}>Тип гарнира:</Typography>
            {mappedFilters}
        </Flex>
    );
});
