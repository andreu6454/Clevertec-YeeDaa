import {
    ChevronDownIcon,
    DeleteIcon,
    IconButton,
    Image,
    Input,
    Menu,
    MenuList,
} from '@chakra-ui/icons';
import { Button, Flex, FormControl, MenuButton } from '@chakra-ui/react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import PlusIcon from '~/assets/svg/plusIcon.svg';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import { NewRecipePageDataType } from '../NewRecipePage';

export type IngredientDataType = {
    title: string;
    count: number;
    measureUnit: string;
};

type IngredientsProps = {
    control: Control<NewRecipePageDataType, IngredientDataType, NewRecipePageDataType>;
    register: UseFormRegister<NewRecipePageDataType>;
};

export const Ingredients = (props: IngredientsProps) => {
    const { control, register } = props;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const addIngredient = () => {
        append({ title: '', count: 0, measureUnit: '' });
    };

    const mappedFields = fields.map((field, index) => (
        <Flex alignItems='center' gap='12px' key={field.id}>
            <FormControl width='295px'>
                <Input size='md' width='295px' placeholder='Ингредиент' />
            </FormControl>

            <FormControl width='80px'>
                <Input
                    type='number'
                    {...register(`ingredients.${index}.count` as const, {
                        required: 'Обязательное поле',
                        valueAsNumber: true,
                        min: { value: 1, message: 'Минимальное значение 1' },
                    })}
                    size='md'
                    width='80px'
                    placeholder='100'
                />
            </FormControl>
            <FormControl width='215px'>
                <Menu>
                    <MenuButton
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        borderRadius='6px'
                        textAlign='start'
                        padding='10px 16px'
                        variant='outlined'
                        justifyContent='space-between'
                        width='215px'
                        minHeight='40px'
                        height='max-content'
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                    >
                        Единица изменрен...
                    </MenuButton>
                    <MenuList></MenuList>
                </Menu>
            </FormControl>

            {index === fields.length - 1 ? (
                <IconButton
                    aria-label='Добавить ингридиет'
                    width='32px'
                    height='32px'
                    variant='ghost'
                    onClick={addIngredient}
                    icon={<Image src={BlackPlusIcon} />}
                />
            ) : (
                <IconButton
                    aria-label='Удалить ингредиент'
                    icon={<DeleteIcon color='#2db100' />}
                    onClick={() => remove(index)}
                    colorScheme='red'
                    variant='ghost'
                />
            )}
        </Flex>
    ));

    return (
        <Flex width='658px' flexDirection='column' gap='16px'>
            <Flex gap='8px' alignItems='center'>
                <Typography fontWeight='600' Size={TypographySizes.md}>
                    Добавьте ингредиенты рецепта, нажав на
                </Typography>
                <Image src={PlusIcon} width='16px' height='16px' />
            </Flex>

            <Flex>
                <Typography
                    width='295px'
                    padding='4px 24px'
                    color='#2db100'
                    fontWeight={700}
                    letterSpacing='0.05em'
                    Size={TypographySizes.xs}
                >
                    Ингредиент
                </Typography>
                <Typography
                    width='125px'
                    padding='4px 0'
                    textAlign='center'
                    color='#2db100'
                    fontWeight={700}
                    letterSpacing='0.05em'
                    Size={TypographySizes.xs}
                >
                    Количество
                </Typography>
                <Typography
                    width='203px'
                    padding='4px 0'
                    textAlign='center'
                    color='#2db100'
                    fontWeight={700}
                    letterSpacing='0.05em'
                    Size={TypographySizes.xs}
                >
                    Единица измерения
                </Typography>
            </Flex>
            {mappedFields}
        </Flex>
    );
};
