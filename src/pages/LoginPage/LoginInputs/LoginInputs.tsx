import { Input } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const LoginInputs = () => (
    <Flex flexDirection='column' gap='24px' width='100%'>
        <Flex flexDirection='column' gap='4px' width='100%'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Логин для входа на сайт
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Введите логин'
            />
        </Flex>
        <Flex flexDirection='column' gap='4px' width='100%'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Пароль
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Пароль для сайта'
                type='password'
            />
        </Flex>
    </Flex>
);
