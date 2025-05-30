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

type CookingTimeProps = {
    register: UseFormRegister<NewRecipeDataType>;
};

export const CookingTime = (props: CookingTimeProps) => {
    const { register } = props;

    return (
        <Flex width='100%' gap={{ base: '16px', xl: '24px' }} alignItems='center'>
            <Typography Size={TypographySizes.md}>Сколько времени готовить в минутах?</Typography>
            <NumberInput size='md' width='90px' defaultValue={30}>
                <NumberInputField
                    {...register('time', { required: true, valueAsNumber: true })}
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
