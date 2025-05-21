import { Button, Flex, Image } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';

import RecoveryImage from '~/assets/loginError.png';
import { PasswordRecovery } from '~/pages/LoginPage/PasswordRecovery/PasswordRecovery';
import { useForgotPasswordMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { passwordRecoverySchema } from '~/shared/types/validationSchemas/signUpSchema';
import { AuthFormInput } from '~/shared/ui/AuthFormInput/AuthFormInput';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type ForgotPasswordProps = {
    setEmail: Dispatch<SetStateAction<string>>;
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

export const ForgotPassword = (props: ForgotPasswordProps) => {
    const { setStep, setEmail } = props;
    const [error, setError] = useState(false);

    const { screenSize } = useScreenSize();

    const alertToast = useAlertToast();

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<PasswordRecovery>({
        mode: 'onBlur',
        resolver: zodResolver(passwordRecoverySchema),
    });

    const [forgotPassword] = useForgotPasswordMutation();

    const onSubmitHandler = handleSubmit(async (data) => {
        try {
            setError(false);
            await forgotPassword(data).unwrap();
            setEmail(data.email);
            setStep(1);
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);

            if (statusCode === 403) {
                setError(true);
                reset();
                alertToast({
                    status: 'error',
                    title: 'Такого e-mail нет',
                    description:
                        'Попробуйте другой e-mail или проверьте правильность его написания',
                });
            }
            if (statusCode >= 500) {
                reset();
                alertToast({
                    status: 'error',
                    title: 'Ошибка сервера',
                    description: 'Попробуйте немного позже',
                });
            }
        }
    });

    return (
        <form id='recovery' onSubmit={onSubmitHandler}>
            <Flex
                flexDirection='column'
                width={sizes[screenSize].width}
                padding='32px'
                alignItems='center'
                gap='32px'
            >
                <Image
                    src={RecoveryImage}
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
                />

                <Flex flexDirection='column' gap='16px'>
                    <Typography
                        Size={TypographySizes.md}
                        color='rgba(0, 0, 0, 0.64)'
                        fontWeight={400}
                        textAlign='center'
                    >
                        Для восстановления входа введите <br />
                        ваш e-mail, куда можно отправить уникальный код
                    </Typography>

                    <AuthFormInput
                        register={register('email')}
                        placeholder='Введите e-mail'
                        error={errors.email?.message}
                        isInvalid={!!errors.email || error}
                        label='Ваш e-mail'
                        dataTestId={DATA_TEST_IDS.emailInput}
                        setValue={setValue}
                    />
                </Flex>

                <Button
                    data-test-id={DATA_TEST_IDS.submitButton}
                    type='submit'
                    backgroundColor='black'
                    color='white'
                    variant='solid'
                    width='100%'
                    onClick={onSubmitHandler}
                    size='lg'
                    margin={0}
                >
                    Получить код
                </Button>

                <Typography
                    Size={TypographySizes.xs}
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.48)'
                >
                    Не пришло письмо? Проверьте папку Спам.
                </Typography>
            </Flex>
        </form>
    );
};
