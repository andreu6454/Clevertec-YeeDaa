import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { sideDishFilters } from '~/shared/data/recipeFilters';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setSideDishFilters, sideDishFiltersSelector } from '~/store/recipesListPage-slice';

export const ChosenSideDishTags = memo(() => {
    const sideDishFiltersData = useAppSelector(sideDishFiltersSelector);
    const dispatch = useAppDispatch();

    return sideDishFiltersData.map((el) => {
        const onClickHandler = () => {
            dispatch(setSideDishFilters(sideDishFiltersData.filter((element) => el != element)));
        };

        return (
            <Tag
                data-test-id='filter-tag'
                height='24px'
                onClick={onClickHandler}
                key={el + 'tag'}
                border='1px solid #b1ff2e'
                borderRadius='6px'
                padding='0px 8px'
                backgroundColor='#eaffc7'
                variant='solid'
                colorScheme='green'
                color='#207e00'
            >
                <TagLabel>
                    {sideDishFilters.filter((element) => element.title === el)[0]?.title}
                </TagLabel>
                <TagCloseButton />
            </Tag>
        );
    });
});
