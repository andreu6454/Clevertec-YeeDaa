import { DeleteIcon, IconButton, Image, Input, Select } from '@chakra-ui/icons';
import { Flex, FormControl } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { useGetMeasureUnitsQuery } from '~/query/services/newRecipe';

type IngredientInputsProps = {
    register: UseFormRegister<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
    isRequired?: boolean;
    isLast?: boolean;
    index: number;
    addIngredient: () => void;
    remove: (index: number) => void;
};

export const IngredientInputs = (props: IngredientInputsProps) => {
    const { register, errors, isRequired = true, isLast, index, addIngredient, remove } = props;

    const errorBorder = '2px solid #e53e3e';

    const { data } = useGetMeasureUnitsQuery();

    const measureUnits = data;

    const border = '1px solid rgba(0, 0, 0, 0.08)';

    const mappedUnits = measureUnits?.map((measureUnit) => (
        <option key={'measureUnit' + measureUnit.name}>{measureUnit.name}</option>
    ));

    return (
        <Flex alignItems='center' gap='16px' flexDirection={{ base: 'column', md: 'row' }}>
            <FormControl width={{ base: '100%', md: '241px', xl: '283px', '2xl': '293px' }}>
                <Input
                    {...register(`ingredients.${index}.title` as const, {
                        required: isRequired,
                    })}
                    border={
                        isRequired
                            ? errors?.ingredients?.[index]?.title?.message && errorBorder
                            : border
                    }
                    size='md'
                    width='100%'
                    placeholder='Ингредиент'
                    color='rgba(0, 0, 0, 0.64)'
                />
            </FormControl>

            <Flex gap={{ base: '12px', xl: '16px' }}>
                <FormControl width='80px'>
                    <Input
                        type='number'
                        {...register(`ingredients.${index}.count` as const, {
                            valueAsNumber: true,
                            required: isRequired,
                        })}
                        border={
                            isRequired
                                ? errors?.ingredients?.[index]?.count?.message && errorBorder
                                : border
                        }
                        size='md'
                        width='80px'
                        placeholder='100'
                        color='rgba(0, 0, 0, 0.64)'
                    />
                </FormControl>
                <FormControl width={{ base: '192px', md: '215px' }}>
                    <Select
                        {...register(`ingredients.${index}.measureUnit` as const, {
                            required: isRequired,
                        })}
                        size='md'
                        placeholder='Единица измерения'
                        border={
                            isRequired
                                ? errors?.ingredients?.[index]?.measureUnit?.message && errorBorder
                                : border
                        }
                    >
                        {mappedUnits}
                    </Select>
                </FormControl>

                {isLast ? (
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
        </Flex>
    );
};
