import { Checkbox } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { sideDishFilters } from '~/shared/data/recipeFilters';
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
            <Checkbox
                onChange={onChangeHandler}
                isChecked={isChecked}
                data-test-id={el.title === 'Картошка' ? 'checkbox-картошка' : ''}
                key={'checkbox' + el.title}
                colorScheme='green'
                sx={{
                    '& .chakra-checkbox__control': {
                        border: '2px solid #d7ff94',
                    },
                }}
                _checked={{
                    '& .chakra-checkbox__control': {
                        bg: '#d7ff94',
                        borderColor: '#d7ff94',
                    },
                }}
            >
                <Typography Size={TypographySizes.sm}>{el.title}</Typography>
            </Checkbox>
        );
    });

    return (
        <Flex direction='column' gap='12px'>
            <Typography Size={TypographySizes.md}>Тип мяса:</Typography>
            {mappedFilters}
        </Flex>
    );
};
