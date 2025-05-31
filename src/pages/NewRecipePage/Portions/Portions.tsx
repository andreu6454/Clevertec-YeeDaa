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
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
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
                    data-test-id={DATA_TEST_IDS.recipePortions}
                    color='rgba(0, 0, 0, 0.92)'
                    _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Flex>
    );
};
