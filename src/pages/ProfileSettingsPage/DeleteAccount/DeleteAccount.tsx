import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { DeleteAccountModal } from '~/pages/ProfileSettingsPage/DeleteAccount/DeleteAccountModal/DeleteAccountModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const DeleteAccount = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const openModalHandler = () => {
        onOpen();
    };

    return (
        <Flex flexDirection='column' gap='16px'>
            <Typography Size={TypographySizes.xl} fontWeight={700}>
                Удаление аккаунта
            </Typography>
            <Button
                rightIcon={<Image src={ArrowRightIcon} />}
                onClick={openModalHandler}
                variant='ghost'
                padding='0'
                width='max-content'
            >
                Удалить мой аккаунт
            </Button>
            <DeleteAccountModal isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
