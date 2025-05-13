import { Input } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const FirstStepInputs = () => (
    <Flex flexDirection='column' gap='24px'>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Ваше имя
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Екатерина'
            />
        </Flex>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Ваша фамилия
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='Константинопольская'
            />
        </Flex>
        <Flex flexDirection='column' gap='4px'>
            <Typography Size={TypographySizes.md} fontWeight={400}>
                Ваш e-mail
            </Typography>
            <Input
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                placeholder='ekaterinabaker@gmail.ru'
            />
        </Flex>
    </Flex>
);
