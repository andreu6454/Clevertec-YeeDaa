import { Box, ChevronDownIcon, Menu, MenuList } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { CategoryHeader } from '~/components/NewRecipeForm/CategoriesSelector/CategoryHeader';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CheckboxWithTitle } from '~/shared/ui/CheckboxWithTitle/CheckboxWithTitle';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { subCategoriesSelector } from '~/store/categories-slice';

import { NewRecipeDataType } from '../NewRecipeForm';

type CategoriesSelectorProps = {
    hasError: boolean;
    setValue: UseFormSetValue<NewRecipeDataType>;
    getValues: UseFormGetValues<NewRecipeDataType>;
};

export const CategoriesSelector = ({ setValue, getValues, hasError }: CategoriesSelectorProps) => {
    const { isDesktopLaptop } = useScreenSize();
    const categoriesFromForm = getValues('categoriesIds');
    const [selectedCategories, setSelectedCategories] = useState(categoriesFromForm || []);
    const [trigger, setTrigger] = useState(false);
    const subCategories = useSelector(subCategoriesSelector);

    useEffect(() => {
        setSelectedCategories(categoriesFromForm);
    }, [trigger, categoriesFromForm]);

    const mappedCategories = subCategories.map((category, index) => {
        const isChecked = selectedCategories?.includes(category._id);

        const onChangeHandle = () => {
            if (isChecked) {
                const filteredCategories = selectedCategories.filter((id) => id !== category._id);
                setValue('categoriesIds', filteredCategories);
            } else {
                const filteredCategories = [...selectedCategories, category._id];
                setValue('categoriesIds', filteredCategories);
            }
            setTrigger((prev) => !prev);
        };

        return (
            <CheckboxWithTitle
                width='100%'
                dataTestId=''
                key={'new_recipe_checkbox' + category.title + category._id}
                title={category.title}
                isChecked={isChecked}
                index={index}
                onChange={onChangeHandle}
            />
        );
    });

    const errorBorder = '2px solid rgb(229, 62, 62)';

    return (
        <Flex height='48px' gap={{ base: '16px', xl: '24px' }} alignItems='center' width='100%'>
            <Typography Size={isDesktopLaptop ? TypographySizes.md : TypographySizes.sm}>
                Выберите не менее 3-х тегов
            </Typography>
            <Box width={{ base: '196px', md: '232px', xl: '350px' }} flexShrink={0}>
                <Menu matchWidth>
                    <MenuButton
                        data-test-id={DATA_TEST_IDS.recipeCategories}
                        border={hasError ? errorBorder : '1px solid rgba(0, 0, 0, 0.08)'}
                        borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
                        borderRadius='6px'
                        textAlign='start'
                        padding='10px 16px'
                        variant='outlined'
                        justifyContent='space-between'
                        width='100%'
                        minHeight='40px'
                        height='max-content'
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                        zIndex={5}
                    >
                        <CategoryHeader categoriesIds={selectedCategories} />
                    </MenuButton>
                    <MenuList zIndex={5} overflowY='scroll' width='100%' height='424px'>
                        {mappedCategories}
                    </MenuList>
                </Menu>
            </Box>
        </Flex>
    );
};
