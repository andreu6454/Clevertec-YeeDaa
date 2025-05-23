import { Box, Flex, Image, Link, Text } from '@chakra-ui/react';

import VerificationError from '~/assets/verificationError.png';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type VerificationErrorModalProps = {
    isOpen: boolean;
    onClose: () => void;
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

export const VerificationErrorModal = (props: VerificationErrorModalProps) => {
    const { isOpen, onClose } = props;
    const { screenSize } = useScreenSize();

    return (
        <CustomModal
            dataTestId={DATA_TEST_IDS.emailVerificationFailedModal}
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
                    src={VerificationError}
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
                />

                <Flex flexDirection='column' gap='16px'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Упс! Что-то пошло не так
                    </Text>
                    <Box>
                        <Typography
                            Size={TypographySizes.md}
                            color='rgba(0, 0, 0, 0.64)'
                            fontWeight={400}
                            textAlign='center'
                        >
                            Ваша ссылка для верификации недействительна. Попробуйте
                            зарегистрироваться снова.
                        </Typography>
                    </Box>
                </Flex>
                <Typography
                    Size={TypographySizes.xs}
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    Остались вопросы? Свяжитесь с
                    <Link textDecoration='underline' ml='4px'>
                        поддержкой
                    </Link>
                </Typography>
            </Flex>
        </CustomModal>
    );
};
