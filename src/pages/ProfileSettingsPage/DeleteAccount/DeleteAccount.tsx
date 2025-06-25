import { Button, Flex, Image } from '@chakra-ui/react';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const DeleteAccount = () => (
    <Flex flexDirection='column' gap='16px'>
        <Typography Size={TypographySizes.xl} fontWeight={700}>
            Удаление аккаунта
        </Typography>
        <Button
            rightIcon={<Image src={ArrowRightIcon} />}
            variant='ghost'
            padding='0'
            width='max-content'
        >
            Удалить мой аккаунт
        </Button>
    </Flex>
);
