import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { navBarData } from '~/shared/data/navBarData';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { filterCategorySelector, setCategoriesFilter } from '~/store/recipesListPage-slice';

export const ChosenCategories = memo(() => {
    const categories = useAppSelector(filterCategorySelector);
    const dispatch = useAppDispatch();

    return categories.map((el) => {
        const onClickHandler = () => {
            dispatch(
                setCategoriesFilter({
                    categories: categories.filter((element) => el != element),
                    subcategory: '',
                }),
            );
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
                <TagLabel>{navBarData.filter((cat) => cat.general === el)[0]?.title}</TagLabel>
                <TagCloseButton />
            </Tag>
        );
    });
});
