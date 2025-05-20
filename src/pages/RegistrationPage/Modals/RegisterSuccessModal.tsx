import { Box, Flex, Image, Link, Text } from '@chakra-ui/react'; // Box исправлен

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import RegisterSuccess from '../../../assets/registerSuccess.png';

type RegisterSuccessModalProps = {
    isOpen: boolean;
    onClose: () => void;
    email: string;
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

export const RegisterSuccessModal = (props: RegisterSuccessModalProps) => {
    const { isOpen, onClose, email } = props;
    const { screenSize } = useScreenSize();

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} width={sizes[screenSize].width}>
            <Flex
                flexDirection='column'
                width={sizes[screenSize].width}
                padding='32px'
                alignItems='center'
                gap='32px'
            >
                <Image
                    src={RegisterSuccess}
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
                />

                <Flex flexDirection='column' gap='16px'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Остался последний шаг. Нужно верифицировать ваш e-mail
                    </Text>
                    <Box>
                        <Typography
                            Size={TypographySizes.md}
                            color='rgba(0, 0, 0, 0.64)'
                            fontWeight={400}
                            textAlign='center'
                        >
                            Мы отправили вам на почту
                        </Typography>
                        <Typography
                            Size={TypographySizes.md}
                            color='rgba(0, 0, 0, 0.64)'
                            fontWeight={600}
                            textAlign='center'
                        >
                            {email}
                        </Typography>
                        <Typography
                            Size={TypographySizes.md}
                            color='rgba(0, 0, 0, 0.64)'
                            fontWeight={400}
                            textAlign='center'
                        >
                            ссылку для верификации.
                        </Typography>
                    </Box>
                </Flex>
                <Typography
                    Size={TypographySizes.xs}
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    Не пришло письмо? Проверьте папку Спам. <br />
                    По другим вопросам свяжитесь с
                    <Link textDecoration='underline'> поддержкой</Link>
                </Typography>
            </Flex>
        </CustomModal>
    );
};
