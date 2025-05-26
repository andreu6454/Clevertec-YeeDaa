import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const Portions = () => (
    <Flex width='100%' gap='24px' mb='24px'>
        <Typography Size={TypographySizes.md}>На сколько человек ваш рецепт?</Typography>
        <NumberInput size='md' width='90px' defaultValue={4}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </Flex>
);
