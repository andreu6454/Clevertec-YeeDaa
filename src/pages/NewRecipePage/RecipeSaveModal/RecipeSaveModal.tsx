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

const sizes = {
    Desktop: {
        width: '396px',
        imgSize: '206px',
    },
    Laptop: {
        width: '396px',
        imgSize: '206px',
    },
    Tablet: {
        width: '316px',
        imgSize: '108px',
    },
    Mobile: {
        width: '316px',
        imgSize: '108px',
    },
};

export const RecipeSaveModal = (props: RecipeSaveModalProps) => {
    const { isOpen, onClose, handleSaveRecipe, continueNavigation } = props;
    const { screenSize } = useScreenSize();

    return (
        <CustomModal
            dataTestId={DATA_TEST_IDS.signInErrorModal}
            isOpen={isOpen}
            onClose={onClose}
            width={sizes[screenSize].width}
        >
            <Flex
                flexDirection='column'
                width={sizes[screenSize].width}
                padding='32px'
                alignItems='center'
                gap='32px'
            >
                <Image
                    src={ModalImage}
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
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
