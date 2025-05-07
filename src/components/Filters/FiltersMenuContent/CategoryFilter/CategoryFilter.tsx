import { ChevronDownIcon, Menu, MenuList } from '@chakra-ui/icons';
import { Button, MenuButton } from '@chakra-ui/react';

import { CategoryFilterHeader } from '~/components/Filters/FiltersMenuContent/CategoryFilter/CategoryFilterHeader/CategoryFilterHeader';
import { CheckboxWithTitle } from '~/shared/ui/CheckboxWithTitle/CheckboxWithTitle';
import { allCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { filterCategorySelector, setCategoriesFilter } from '~/store/recipesListPage-slice';

export const CategoryFilter = () => {
    const dispatch = useAppDispatch();

    const allCategories = useAppSelector(allCategoriesSelector);
    const categories = useAppSelector(filterCategorySelector);

    const mappedCategories = allCategories.map((el, index) => {
        const isChecked = categories.includes(el.category);
        const onChangeHandler = () => {
            if (isChecked) {
                dispatch(
                    setCategoriesFilter({
                        categories: categories.filter((item) => item !== el.category),
                        subcategory: '',
                    }),
                );
            } else {
                dispatch(
                    setCategoriesFilter({
                        categories: [...categories, el.category],
                        subcategory: '',
                    }),
                );
            }
        };
        return (
            <CheckboxWithTitle
                dataTestId={el.title === 'Веганская кухня' ? 'checkbox-веганская кухня' : ''}
                key={el.title + 'menuitem'}
                title={el.title}
                isChecked={isChecked}
                onChange={onChangeHandler}
                index={index}
            />
        );
    });

    return (
        <Menu min-height='40px'>
            <MenuButton
                data-test-id='filter-menu-button-категория'
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                textAlign='start'
                padding='8px 12px 8px 16px'
                variant='outlined'
                justifyContent='space-between'
                width='100%'
                min-height='40px'
                height='max-content'
                as={Button}
                rightIcon={<ChevronDownIcon width='20px' height='20px' />}
            >
                <CategoryFilterHeader />
            </MenuButton>
            <MenuList width='100%'>{mappedCategories}</MenuList>
        </Menu>
    );
};
