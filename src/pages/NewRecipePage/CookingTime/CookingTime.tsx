import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipePageDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type CookingTimeProps = {
    register: UseFormRegister<NewRecipePageDataType>;
};

export const CookingTime = (props: CookingTimeProps) => {
    const { register } = props;

    return (
        <Flex width='100%' gap='24px' mb='24px'>
            <Typography Size={TypographySizes.md}>Сколько времени готовить в минутах?</Typography>
            <NumberInput size='md' width='90px' defaultValue={30}>
                <NumberInputField {...register('time', { required: true, valueAsNumber: true })} />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </Flex>
    );
};
