import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';

import { LoginInputs } from '~/pages/LoginPage/LoginInputs/LoginInputs';
import { LoginModalError } from '~/pages/LoginPage/LoginModalError/LoginModalError';
import { PasswordRecovery } from '~/pages/LoginPage/PasswordRecovery/PasswordRecovery';
import { useLoginMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { AUTH_LOGIN_STATUSES } from '~/shared/constants/authStatuses';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';
import { signInSchema } from '~/shared/types/validationSchemas/loginSchema';
import { emailVerifiedSelector } from '~/store/app-slice';
import { setIsLogin } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

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
    const dispatch = useAppDispatch();

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

    const [login] = useLoginMutation();

    const onSubmitHandler = handleSubmit(async (data) => {
        try {
            await login(data).unwrap();
            dispatch(setIsLogin(true));
            navigate('/');
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.data.statusCode);

            if (statusCode > 400 && statusCode < 500) {
                alertToast(AUTH_LOGIN_STATUSES[statusCode as keyof typeof AUTH_LOGIN_STATUSES]);
            }
            if (statusCode > 500) {
                onOpen();
            }
        }
    });

    return (
        <AuthLayout>
            <Flex flexDirection='column' width='100%' max-height='468px'>
                <form onSubmit={onSubmitHandler}>
                    <LoginInputs setValue={setValue} register={register} errors={errors} />
                    <Button
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
        </AuthLayout>
    );
});
