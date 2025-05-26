import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
} from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const CookingTime = () => (
    <Flex width='100%' gap='24px' mb='24px'>
        <Typography Size={TypographySizes.md}>Сколько времени готовить в минутах?</Typography>
        <NumberInput size='md' width='90px' defaultValue={30}>
            <NumberInputField />
            <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
            </NumberInputStepper>
        </NumberInput>
    </Flex>
);
