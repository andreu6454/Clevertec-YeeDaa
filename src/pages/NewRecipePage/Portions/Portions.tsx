import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type PortionsProps = {
    register: UseFormRegister<NewRecipeDataType>;
};

export const Portions = (props: PortionsProps) => {
    const { register } = props;

    return (
        <Flex width='100%' gap='24px' alignItems='center'>
            <Typography Size={TypographySizes.md}>На сколько человек ваш рецепт?</Typography>
            <NumberInput size='md' width='90px' defaultValue={4}>
                <NumberInputField
                    {...register('portions', { required: true, valueAsNumber: true })}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Flex>
    );
};
