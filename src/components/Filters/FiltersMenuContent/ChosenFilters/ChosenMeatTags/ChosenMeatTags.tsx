import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { meatFilters } from '~/shared/data/recipeFilters';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { meatFiltersSelector, setMeatFilters } from '~/store/recipesListPage-slice';

export const ChosenMeatTags = memo(() => {
    const meatFiltersData = useAppSelector(meatFiltersSelector);
    const dispatch = useAppDispatch();

    return meatFiltersData.map((el) => {
        const onClickHandler = () => {
            dispatch(setMeatFilters(meatFiltersData.filter((element) => el != element)));
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
                <TagLabel>
                    {meatFilters.filter((element) => element.general === el)[0]?.title}
                </TagLabel>
                <TagCloseButton onClick={onClickHandler} />
            </Tag>
        );
    });
});
