import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { memo } from 'react';

import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';
import {
    categoryIdsSelector,
    setCategoriesFilter,
    subCategoriesIdsSelector,
} from '~/store/slices/recipesListPage-slice';

export const ChosenCategories = memo(() => {
    const categories = useAppSelector(categoryIdsSelector);
    const subCategories = useAppSelector(subCategoriesIdsSelector);
    const allCategories = useAppSelector(categoriesSelector);
    const dispatch = useAppDispatch();

    return categories.map((el) => {
        const category = allCategories.find((item) => item._id === el);

        const onClickHandler = () => {
            dispatch(
                setCategoriesFilter({
                    categories: categories.filter((item) => item !== el),
                    subcategory: subCategories.filter(
                        (item) => item !== category?.subCategories[0]._id,
                    ),
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
                <TagLabel>{allCategories.filter((cat) => cat._id === el)[0]?.title}</TagLabel>
                <TagCloseButton />
            </Tag>
        );
    });
});
