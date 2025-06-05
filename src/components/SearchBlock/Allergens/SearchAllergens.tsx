import { ChevronDownIcon, Menu, MenuList, Switch } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';
import { memo } from 'react';

import { NewAllergenInput } from '~/components/Filters/FiltersMenuContent/AllergensFilter/NewAllergenInput/NewAllergenInput';
import { SearchAllergensHeader } from '~/components/SearchBlock/Allergens/SearchAllergensHeader/SearchAllergensHeader';
import { allergenFilters } from '~/shared/constants/recipeFilters';
import { ZIndex } from '~/shared/constants/style/zIndex';
import { CheckboxWithTitle } from '~/shared/ui/CheckboxWithTitle/CheckboxWithTitle';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    allergensSelector,
    searchAllergenFilterOnSelector,
    setAllergens,
    setIsSearchAllergenFilterOn,
} from '~/store/slices/recipesListPage-slice';

export const SearchAllergens = memo(() => {
    const dispatch = useAppDispatch();
    const isSearchAllergenFilterOn = useAppSelector(searchAllergenFilterOnSelector);
    const allergens = useAppSelector(allergensSelector);

    const border = allergens.length === 0 ? '1px solid rgba(0, 0, 0, 0.08)' : '1px solid #d7ff94';
    const onChangeHandler = () => {
        dispatch(setIsSearchAllergenFilterOn());
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
                <MenuList zIndex={ZIndex.allergens} width='100%' data-test-id='allergens-menu'>
                    {isSearchAllergenFilterOn && mappedAllergens}
                    {isSearchAllergenFilterOn && <NewAllergenInput />}
                </MenuList>
            </Menu>
        </Flex>
    );
});
