import { Box, Image } from '@chakra-ui/icons';
import { Button, Flex, Textarea } from '@chakra-ui/react';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import UploadImage from '~/assets/uploadImageSmall.png';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const Steps = () => (
    <Flex width='658px' flexDirection='column' gap='16px'>
        <Typography fontWeight='600' Size={TypographySizes.md}>
            Добавьте шаги приготовления
        </Typography>
        <Flex border='1px solid rgba(0, 0, 0, 0.08)' borderRadius='8px'>
            <Image width='346px' height='160px' src={UploadImage} />
            <Flex flexDirection='column' padding='20px' gap='16px'>
                <Box
                    padding='2px 8px'
                    backgroundColor='rgba(0, 0, 0, 0.06)'
                    borderRadius='4px'
                    width='max-content'
                >
                    <Typography Size={TypographySizes.sm}>Шаг 1</Typography>
                </Box>
                <Textarea placeholder='Шаг' width='100%' height='84px' />
            </Flex>
        </Flex>
        <Flex width='100%' justifyContent='flex-end'>
            <Button
                border='1px solid rgba(0, 0, 0, 0.48)'
                borderRadius='6px'
                padding='0px 12px'
                variant='outlined'
                rightIcon={<Image width='14px' height='14px' src={BlackPlusIcon} />}
            >
                Новый шаг
            </Button>
        </Flex>
    </Flex>
);
