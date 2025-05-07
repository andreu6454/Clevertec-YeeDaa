import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { allCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { filterCategorySelector, setCategoriesFilter } from '~/store/recipesListPage-slice';

export const ChosenCategories = memo(() => {
    const categories = useAppSelector(filterCategorySelector);
    const allCategories = useAppSelector(allCategoriesSelector);
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
                <TagLabel>{allCategories.filter((cat) => cat.category === el)[0]?.title}</TagLabel>
                <TagCloseButton />
            </Tag>
        );
    });
});
