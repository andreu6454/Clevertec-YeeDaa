import { IconButton, Image, Input } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import AddIcon from '~/assets/svg/addIcon.svg';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    allergensSearchFilterOnSelector,
    allergensSelector,
    setAllergens,
} from '~/store/recipesListPage-slice';

export const NewAllergenInput = () => {
    const [value, setValue] = useState('');
    const allergens = useAppSelector(allergensSelector);
    const isSearchAllergenFilterOn = useAppSelector(allergensSearchFilterOnSelector);

    const dispatch = useAppDispatch();

    const onChangeHandle = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleAddAllergen = () => {
        if (value.trim()) {
            dispatch(setAllergens([...allergens, value.trim()]));
            setValue('');
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Предотвращаем перенос строки
            handleAddAllergen();
            if (isSearchAllergenFilterOn) {
                // dispatch(setFilteredData());
            }
        }
    };

    const onAddButtonClick = () => {
        dispatch(setAllergens([...allergens, value]));
        setValue('');
        if (isSearchAllergenFilterOn) {
            // dispatch(setFilteredData());
        }
    };

    return (
        <Flex
            backgroundColor='#fff'
            width='269px'
            height='48px'
            padding='6px 16px'
            alignItems='center'
            justifyContent='space-between'
        >
            <Input
                onKeyDown={onKeyDown}
                onChange={onChangeHandle}
                value={value}
                data-test-id='add-other-allergen'
                placeholder='Другой аллерген'
                borderRadius='4px'
                border='1px solid rgba(0, 0, 0, 0.08)'
                width='205px'
                size='sm'
                variant='outlined'
            />
            <IconButton
                data-test-id='add-allergen-button'
                onClick={onAddButtonClick}
                aria-label='add-new-allergen'
                size='xs'
                variant='ghost'
                icon={<Image src={AddIcon} />}
            />
        </Flex>
    );
};
