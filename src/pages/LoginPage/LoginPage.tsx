import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { LoginInputs } from '~/pages/LoginPage/LoginInputs/LoginInputs';
import { LoginModalError } from '~/pages/LoginPage/LoginModalError/LoginModalError';
import { PasswordRecovery } from '~/pages/LoginPage/PasswordRecovery/PasswordRecovery';
import { useLoginMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { AUTH_LOGIN_STATUSES } from '~/shared/constants/alertStatuses/authStatuses';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';
import { signInSchema } from '~/shared/types/validationSchemas/loginSchema';
import { useAppSelector } from '~/store/hooks';
import { emailVerifiedSelector } from '~/store/slices/app-slice';

export type LoginFormDataType = {
    login: string;
    password: string;
};

export const LoginPage = memo(() => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormDataType>({
        mode: 'onBlur',
        resolver: zodResolver(signInSchema),
    });

    const isEmailVerified = useAppSelector(emailVerifiedSelector);

    const navigate = useNavigate();
    const alertToast = useAlertToast();

    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        if (isEmailVerified) {
            alertToast({
                status: 'success',
                title: 'Верификация прошла успешно',
            });
        }
    }, [isEmailVerified]);

    const [login, { isLoading }] = useLoginMutation();

    const onSubmitHandler = handleSubmit(async (data) => {
        try {
            await login(data).unwrap();
            navigate(APP_PATHS.root);
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);

            if (statusCode > 400 && statusCode < 500) {
                alertToast(AUTH_LOGIN_STATUSES[statusCode as keyof typeof AUTH_LOGIN_STATUSES]);
            }
            if (statusCode >= 500) {
                onOpen();
            }
        }
    });

    return (
        <AuthLayout>
            <Flex flexDirection='column' width='100%' max-height='468px'>
                <form onSubmit={onSubmitHandler} data-test-id={DATA_TEST_IDS.signInForm}>
                    <LoginInputs setValue={setValue} register={register} errors={errors} />
                    <Button
                        data-test-id={DATA_TEST_IDS.submitButton}
                        marginTop='112px'
                        type='submit'
                        width='100%'
                        size='lg'
                        variant='solid'
                        backgroundColor='rgba(0, 0, 0, 0.92)'
                        color='#fff'
                    >
                        Войти
                    </Button>
                </form>
                <PasswordRecovery />
            </Flex>
            <LoginModalError isOpen={isOpen} onClose={onClose} onSubmit={onSubmitHandler} />
            {isLoading && <FullScreenSpinner />}
        </AuthLayout>
    );
});
