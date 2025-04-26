import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { allergensSelector, setAllergens } from '~/store/recipesListPage-slice';

export const ChosenAllergens = memo(() => {
    const allergens = useAppSelector(allergensSelector);
    const dispatch = useAppDispatch();

    return allergens.map((el) => {
        const onClickHandler = () => {
            dispatch(setAllergens(allergens.filter((element) => el != element)));
        };

        return (
            <Tag
                data-test-id='filter-tag'
                height='24px'
                key={el + 'tag'}
                border='1px solid #b1ff2e'
                borderRadius='6px'
                padding='0px 8px'
                color='#207e00'
                backgroundColor='#eaffc7'
                variant='solid'
                colorScheme='green'
            >
                <TagLabel>{el}</TagLabel>
                <TagCloseButton onClick={onClickHandler} />
            </Tag>
        );
    });
});
