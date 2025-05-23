import { Button, Flex, Text } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { SecondStepInputs } from '~/pages/RegistrationPage/Steps/SecondStepInputs/SecondStepInputs';
import { useResetPasswordMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { userPasswordSchema } from '~/shared/types/validationSchemas/signUpSchema';

type ResetPasswordProps = {
    onClose: () => void;
    email: string;
};

export type AccountRecoveryType = {
    login: string;
    password: string;
    passwordConfirm: string;
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

export const ResetPassword = (props: ResetPasswordProps) => {
    const { onClose, email } = props;

    const { screenSize } = useScreenSize();

    const alertToast = useAlertToast();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<AccountRecoveryType>({
        mode: 'onBlur',
        resolver: zodResolver(userPasswordSchema),
    });

    const [resetPassword, { isLoading }] = useResetPasswordMutation();

    const onSubmitHandler = handleSubmit(async (data) => {
        try {
            await resetPassword({ ...data, email: email }).unwrap();
            alertToast({
                status: 'success',
                title: 'Восстановление данных успешно',
            });
            onClose();
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);

            if (statusCode >= 500) {
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
                <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                    Восстановление <br />
                    аккаунта
                </Text>
                <SecondStepInputs modal errors={errors} register={register} setValue={setValue} />
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
                    Зарегистрироваться
                </Button>
            </Flex>
            {isLoading && <FullScreenSpinner />}
        </form>
    );
};
