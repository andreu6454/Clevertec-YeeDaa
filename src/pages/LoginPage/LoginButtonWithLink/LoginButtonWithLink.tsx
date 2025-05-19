import { Button, Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const LoginButtonWithLink = () => (
    <Flex flexDirection='column' width='100%' gap='16px' alignItems='center' marginTop='112px'>
        <Button
            type='submit'
            width='100%'
            size='lg'
            variant='solid'
            backgroundColor='rgba(0, 0, 0, 0.92)'
            color='#fff'
        >
            Войти
        </Button>
        <Typography Size={TypographySizes.md}>Забыли логин или пароль?</Typography>
    </Flex>
);
