import { Image } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { Control, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';

import PlusIcon from '~/assets/svg/plusIcon.svg';
import { IngredientInputs } from '~/pages/NewRecipePage/Ingredients/ingredientInputs';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import { NewRecipeDataType } from '../NewRecipePage';

export type IngredientDataType = {
    title: string;
    count: number;
    measureUnit: string;
};

type IngredientsProps = {
    control: Control<NewRecipeDataType, IngredientDataType, NewRecipeDataType>;
    register: UseFormRegister<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
};

export const Ingredients = (props: IngredientsProps) => {
    const { control, register, errors } = props;

    const { isMobile } = useScreenSize();

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'ingredients',
    });

    const addIngredient = () => {
        append({ title: '', count: 0, measureUnit: '' });
    };

    const mappedFields = fields.map((field, index) => {
        const isLast = index === fields.length - 1;

        return (
            <IngredientInputs
                addIngredient={addIngredient}
                key={field.id}
                errors={errors}
                register={register}
                isLast={isLast}
                isRequired={!isLast}
                index={index}
                remove={remove}
            />
        );
    });

    return (
        <Flex
            width={{ base: '100%', md: '604px', xl: '658px' }}
            flexDirection='column'
            gap={{ base: '12px', xl: '16px' }}
        >
            <Flex gap='8px' alignItems='center'>
                <Typography fontWeight='600' Size={TypographySizes.md}>
                    Добавьте ингредиенты рецепта, нажав на
                </Typography>
                <Image src={PlusIcon} width='16px' height='16px' />
            </Flex>

            {!isMobile && (
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
            )}
            {mappedFields}
        </Flex>
    );
};
