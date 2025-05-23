import { PinInput } from '@chakra-ui/icons';
import { Box, Flex, Image, PinInputField, Text } from '@chakra-ui/react';
import { Dispatch, SetStateAction, useState } from 'react';

import OTPCode from '~/assets/otpCode.png';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useVerifyOtpMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type VerifyOtpProps = {
    email: string;
    setStep: Dispatch<SetStateAction<number>>;
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

export const VerifyOtp = (props: VerifyOtpProps) => {
    const { email, setStep } = props;
    const { screenSize } = useScreenSize();

    const [pin, setPin] = useState('');
    const [isError, setIsError] = useState(false);

    const onChangeHandler = (value: string) => {
        setPin(value);
        setIsError(false);
    };

    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
    const alertToast = useAlertToast();

    const onCompleteHandler = async (data: string) => {
        const otpParams = { email: email, otpToken: data };
        try {
            await verifyOtp(otpParams).unwrap();
            setStep(2);
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);

            if (statusCode === 403) {
                setPin('');
                setIsError(true);
            }
            if (statusCode >= 500) {
                setPin('');
                alertToast({
                    status: 'error',
                    title: 'Ошибка сервера',
                    description: 'Попробуйте немного позже',
                });
            }
        }
    };

    return (
        <Flex
            flexDirection='column'
            width={sizes[screenSize].width}
            padding='32px'
            alignItems='center'
            gap='32px'
        >
            <Image
                src={OTPCode}
                width={sizes[screenSize].imgSize}
                height={sizes[screenSize].imgSize}
            />

            <Box>
                {isError && (
                    <Text
                        fontWeight='700'
                        fontSize='24px'
                        lineHeight='133%'
                        textAlign='center'
                        marginBottom='16px'
                    >
                        Неверный код
                    </Text>
                )}
                <Typography
                    Size={TypographySizes.md}
                    color='rgba(0, 0, 0, 0.64)'
                    fontWeight={400}
                    textAlign='center'
                >
                    Мы отправили вам на e-mail
                </Typography>
                <Typography Size={TypographySizes.md} fontWeight={600} textAlign='center'>
                    {email}
                </Typography>
                <Typography
                    Size={TypographySizes.md}
                    color='rgba(0, 0, 0, 0.64)'
                    fontWeight={400}
                    textAlign='center'
                >
                    шестизначный код. Введите его ниже.
                </Typography>
            </Box>

            <Flex gap='6px' justifyContent='center'>
                <PinInput
                    type='number'
                    autoFocus
                    onChange={onChangeHandler}
                    value={pin}
                    onComplete={onCompleteHandler}
                >
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '1'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '2'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '3'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '4'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '5'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                    <PinInputField
                        data-test-id={DATA_TEST_IDS.verificationCodeInput + '6'}
                        borderColor={isError ? '#e53e3e' : ''}
                    />
                </PinInput>
            </Flex>

            <Typography Size={TypographySizes.xs} textAlign='center' color='rgba(0, 0, 0, 0.48)'>
                Не пришло письмо? Проверьте папку Спам.
            </Typography>
            {isLoading && <FullScreenSpinner />}
        </Flex>
    );
};
