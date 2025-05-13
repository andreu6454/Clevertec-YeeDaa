import { Input } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const SecondStepInputs = () => (
    <Flex flexDirection='column' gap='24px'>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Логин для входа на сайт
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Логин'
            />
        </Flex>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Пароль
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Пароль'
                type='password'
            />
        </Flex>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Повторите пароль
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Повторите пароль'
                type='password'
            />
        </Flex>
    </Flex>
);
