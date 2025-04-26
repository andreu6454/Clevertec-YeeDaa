import { ChevronDownIcon, Menu, MenuList, Switch } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';
import { memo } from 'react';

import { NewAllergenInput } from '~/components/Filters/FiltersMenuContent/AllergensFilter/NewAllergenInput/NewAllergenInput';
import { SearchAllergensHeader } from '~/components/SearchBlock/Allergens/SearchAllergensHeader/SearchAllergensHeader';
import { allergenFilters } from '~/shared/data/recipeFilters';
import { CheckboxWithTitle } from '~/shared/ui/CheckboxWithTitle/CheckboxWithTitle';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    allergensSearchFilterOnSelector,
    allergensSelector,
    setAllergens,
    setFilteredData,
    setIsSearchAllergenFilterOn,
} from '~/store/recipesListPage-slice';

export const SearchAllergens = memo(() => {
    const dispatch = useAppDispatch();
    const isSearchAllergenFilterOn = useAppSelector(allergensSearchFilterOnSelector);
    const allergens = useAppSelector(allergensSelector);

    const border = allergens.length === 0 ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid #d7ff94';
    const onChangeHandler = () => {
        dispatch(setIsSearchAllergenFilterOn());
    };

    const mappedAllergens = allergenFilters.map((el, index) => {
        const isChecked = allergens.includes(el.title);

        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(setAllergens(allergens.filter((item) => item !== el.title)));
            } else {
                dispatch(setAllergens([...allergens, el.title]));
            }
            dispatch(setFilteredData());
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
        <Flex width='518px' gap='16px'>
            <Flex padding='6px 0 6px 8px' gap='12px' alignItems='center'>
                <Typography Size={TypographySizes.md}>Исключить аллергены</Typography>
                <Switch
                    onChange={onChangeHandler}
                    isChecked={isSearchAllergenFilterOn}
                    data-test-id='allergens-switcher'
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
                    data-test-id='allergens-menu-button'
                    pointerEvents={isSearchAllergenFilterOn ? 'auto' : 'none'}
                    isDisabled={!isSearchAllergenFilterOn}
                    border={border}
                    borderRadius='6px'
                    textAlign='start'
                    padding='10px 16px'
                    variant='outlined'
                    justifyContent='space-between'
                    width='269px'
                    min-height='40px'
                    height='max-content'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    <SearchAllergensHeader />
                </MenuButton>
                <MenuList width='100%' data-test-id='allergens-menu'>
                    {isSearchAllergenFilterOn && mappedAllergens}
                    {isSearchAllergenFilterOn && <NewAllergenInput />}
                </MenuList>
            </Menu>
        </Flex>
    );
});
