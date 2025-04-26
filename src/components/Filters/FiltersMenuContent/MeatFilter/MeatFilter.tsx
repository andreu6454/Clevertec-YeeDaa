import { Flex } from '@chakra-ui/react';

import { meatFilters } from '~/shared/data/recipeFilters';
import { CustomCheckbox } from '~/shared/ui/Checkbox/Checkbox';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { meatFiltersSelector, setMeatFilters } from '~/store/recipesListPage-slice';

export const MeatFilter = () => {
    const dispatch = useAppDispatch();
    const meatFiltersData = useAppSelector(meatFiltersSelector);

    const mappedFilters = meatFilters.map((el) => {
        const isChecked = meatFiltersData.includes(el.general);

        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(setMeatFilters(meatFiltersData.filter((item) => item !== el.general)));
            } else {
                dispatch(setMeatFilters([...meatFiltersData, el.general]));
            }
        };

        return (
            <CustomCheckbox
                title={el.title}
                key={el.general}
                onChangeHandler={onChangeHandler}
                isChecked={isChecked}
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
