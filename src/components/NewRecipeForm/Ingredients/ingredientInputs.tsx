import { DeleteIcon, IconButton, Image, Input, Select } from '@chakra-ui/icons';
import { Flex, FormControl } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetMeasureUnitsQuery } from '~/query/services/newRecipe';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

import { NewRecipeDataType } from '../NewRecipeForm';

type IngredientInputsProps = {
    register: UseFormRegister<NewRecipeDataType>;
    hasError: boolean;
    isRequired?: boolean;
    isLast?: boolean;
    index: number;
    addIngredient: () => void;
    remove: (index: number) => void;
    setIsRedirectBlocked: (arg: boolean) => void;
};

export const IngredientInputs = (props: IngredientInputsProps) => {
    const {
        register,
        hasError,
        isRequired = true,
        isLast,
        index,
        addIngredient,
        remove,
        setIsRedirectBlocked,
    } = props;

    const { data: measureUnits, isLoading } = useGetMeasureUnitsQuery();

    const errorBorder = '2px solid rgb(229, 62, 62)';
    const border = '1px solid rgba(0, 0, 0, 0.08)';

    const mappedUnits = measureUnits?.map((measureUnit) => (
        <option key={'measureUnit' + measureUnit.name}>{measureUnit.name}</option>
    ));

    if (isLoading) return <FullScreenSpinner />;
    if (!measureUnits) return null;

    const onFocusHandler = () => {
        setIsRedirectBlocked(true);
    };

    return (
        <Flex alignItems='center' gap='16px' flexDirection={{ base: 'column', md: 'row' }}>
            <FormControl width={{ base: '100%', md: '241px', xl: '283px', '2xl': '293px' }}>
                <Input
                    {...register(`ingredients.${index}.title` as const, {
                        required: isRequired,
                    })}
                    data-test-id={`recipe-ingredients-title-${index}`}
                    border={isRequired ? (hasError ? errorBorder : border) : border}
                    borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
                    size='md'
                    width='100%'
                    placeholder='Ингредиент'
                    color='rgba(0, 0, 0, 0.92)'
                    _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                    _focus={{ borderColor: hasError ? 'rgb(229, 62, 62)' : 'rgb(49, 130, 206)' }}
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
                        data-test-id={`recipe-ingredients-count-${index}`}
                        border={isRequired ? (hasError ? errorBorder : border) : border}
                        borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
                        size='md'
                        width='80px'
                        placeholder='100'
                        color='rgba(0, 0, 0, 0.92)'
                        _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                        _focus={{
                            borderColor: hasError ? 'rgb(229, 62, 62)' : 'rgb(49, 130, 206)',
                        }}
                    />
                </FormControl>
                <FormControl width={{ base: '192px', md: '215px' }}>
                    <Select
                        {...register(`ingredients.${index}.measureUnit` as const, {
                            required: isRequired,
                        })}
                        onFocus={onFocusHandler}
                        data-test-id={`recipe-ingredients-measureUnit-${index}`}
                        size='md'
                        placeholder='Единица измерения'
                        border={isRequired ? (hasError ? errorBorder : border) : border}
                        borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
                        color='rgba(0, 0, 0, 0.92)'
                        _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                    >
                        {mappedUnits}
                    </Select>
                </FormControl>

                {isLast ? (
                    <IconButton
                        data-test-id={DATA_TEST_IDS.recipeAddIngredients}
                        aria-label='Добавить ингридиет'
                        width='32px'
                        height='32px'
                        variant='ghost'
                        onClick={addIngredient}
                        icon={<Image src={BlackPlusIcon} />}
                    />
                ) : (
                    <IconButton
                        data-test-id={`recipe-ingredients-remove-ingredients-${index}`}
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
