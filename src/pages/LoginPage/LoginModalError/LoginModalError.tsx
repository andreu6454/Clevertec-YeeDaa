import { Button, Flex, Image, Text } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import LoginError from '../../../assets/breakfast.png';

type LoginModalErrorProps = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: () => void;
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

export const LoginModalError = (props: LoginModalErrorProps) => {
    const { isOpen, onClose, onSubmit } = props;

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
                    src={LoginError}
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
                />

                <Flex flexDirection='column' gap='16px'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Вход не выполнен
                    </Text>
                    <Typography
                        Size={TypographySizes.md}
                        color='rgba(0, 0, 0, 0.64)'
                        fontWeight={400}
                        textAlign='center'
                    >
                        Что-то пошло не так. <br /> Попробуйте еще раз
                    </Typography>
                </Flex>

                <Button
                    data-test-id={DATA_TEST_IDS.repeatButton}
                    backgroundColor='black'
                    color='white'
                    variant='solid'
                    width='100%'
                    onClick={onSubmit}
                    size='lg'
                >
                    Повторить
                </Button>
            </Flex>
        </CustomModal>
    );
};
