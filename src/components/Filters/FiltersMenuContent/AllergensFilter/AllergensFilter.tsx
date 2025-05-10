import { ChevronDownIcon, Menu, MenuList, Switch } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';
import { memo } from 'react';

import { AllergensFilterHeader } from '~/components/Filters/FiltersMenuContent/AllergensFilter/AllergensFilterHeader/AllergensFilterHeader';
import { NewAllergenInput } from '~/components/Filters/FiltersMenuContent/AllergensFilter/NewAllergenInput/NewAllergenInput';
import { allergenFilters } from '~/shared/data/recipeFilters';
import { CheckboxWithTitle } from '~/shared/ui/CheckboxWithTitle/CheckboxWithTitle';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    allergenFilterOnSelector,
    allergensSelector,
    setAllergens,
    setIsAllergenFilterOn,
} from '~/store/recipesListPage-slice';

export const AllergensFilter = memo(() => {
    const dispatch = useAppDispatch();
    const isAllergenFilterOn = useAppSelector(allergenFilterOnSelector);

    const allergens = useAppSelector(allergensSelector);
    const border = allergens.length === 0 ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid #d7ff94';

    const onChangeHandler = () => {
        dispatch(setIsAllergenFilterOn());
    };

    const mappedAllergens = allergenFilters.map((el, index) => {
        const isChecked = allergens.includes(el.ingredients[0]);

        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(setAllergens(allergens.filter((item) => item !== el.ingredients[0])));
            } else {
                dispatch(setAllergens([...allergens, el.ingredients[0]]));
            }
        };

        return (
            <CheckboxWithTitle
                dataTestId={`allergen-${index}`}
                key={'checkbox' + el.title}
                title={el.title}
                isChecked={isChecked}
                onChange={onChangeHandler}
                index={index}
            />
        );
    });

    return (
        <Flex direction='column' gap='8px'>
            <Flex padding='6px 0 6px 8px' gap='12px' alignItems='center'>
                <Typography Size={TypographySizes.md}>Исключить мои аллергены</Typography>
                <Switch
                    onChange={onChangeHandler}
                    isChecked={isAllergenFilterOn}
                    data-test-id='allergens-switcher-filter'
                    size='md'
                    _checked={{
                        '& .chakra-switch__track': {
                            bg: '#b1ff2e',
                        },
                    }}
                />
            </Flex>

            <Menu min-height='40px'>
                <MenuButton
                    data-test-id='allergens-menu-button-filter'
                    pointerEvents={isAllergenFilterOn ? 'auto' : 'none'}
                    border={border}
                    borderRadius='6px'
                    textAlign='start'
                    padding='10px 16px'
                    variant='outlined'
                    justifyContent='space-between'
                    width='100%'
                    min-height='40px'
                    height='max-content'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    <AllergensFilterHeader />
                </MenuButton>
                <MenuList width='100%'>
                    {isAllergenFilterOn && mappedAllergens}
                    {isAllergenFilterOn && <NewAllergenInput />}
                </MenuList>
            </Menu>
        </Flex>
    );
});
