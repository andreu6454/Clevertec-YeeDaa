import { Button, Flex, Image, Text } from '@chakra-ui/react';

import ModalImage from '~/assets/loginError.png';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type RecipeSaveModalProps = {
    isOpen: boolean;
    onClose: () => void;
    handleSaveRecipe: () => void;
    continueNavigation: () => void;
};

export const RecipeSaveModal = ({
    isOpen,
    onClose,
    handleSaveRecipe,
    continueNavigation,
}: RecipeSaveModalProps) => {
    const { isDesktopLaptop } = useScreenSize();

    return (
        <CustomModal
            dataTestId={DATA_TEST_IDS.recipePreventiveModal}
            isOpen={isOpen}
            onClose={onClose}
            width={isDesktopLaptop ? '396px' : '316px'}
        >
            <Flex
                flexDirection='column'
                width={{ base: '316px', xl: '396px' }}
                padding='32px'
                alignItems='center'
                gap='32px'
            >
                <Image
                    src={ModalImage}
                    width={{ base: '118px', xl: '206px' }}
                    height={{ base: '118px', xl: '206px' }}
                />
                <Flex width='100%' flexDirection='column' gap='16px'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Выйти без сохранения?
                    </Text>
                    <Typography
                        Size={TypographySizes.md}
                        color='rgba(0, 0, 0, 0.64)'
                        fontWeight={400}
                        textAlign='center'
                    >
                        Чтобы сохранить, нажмите кнопку сохранить рецепт
                    </Typography>
                </Flex>

                <Flex width='100%' flexDirection='column' gap='16px'>
                    <Button
                        onClick={handleSaveRecipe}
                        width='100%'
                        size='lg'
                        backgroundColor='#000'
                        color='#fff'
                    >
                        Сохранить черновик
                    </Button>
                    <Button onClick={continueNavigation} variant='ghost' width='100%' size='lg'>
                        Выйти без сохранения
                    </Button>
                </Flex>
            </Flex>
        </CustomModal>
    );
};
