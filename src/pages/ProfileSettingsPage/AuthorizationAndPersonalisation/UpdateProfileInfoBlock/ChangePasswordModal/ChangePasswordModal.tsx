import { Button, Text, VStack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { useUpdatePasswordMutation } from '~/query/services/users';
import { ErrorResponse } from '~/query/types/types';
import { ALERT_STATUSES, defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { updatePasswordSchema } from '~/shared/types/validationSchemas/userProfileSchema';
import { AuthPasswordInput } from '~/shared/ui/AuthPasswordInput/AuthPasswordInput';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';

type ChangePasswordModalProps = {
    isOpen: boolean;
    onCLose: () => void;
};
export type ChangePasswordDataType = {
    oldPassword: string;
    password: string;
    passwordConfirm: string;
};

export const ChangePasswordModal = ({ isOpen, onCLose }: ChangePasswordModalProps) => {
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors },
    } = useForm<ChangePasswordDataType>({
        resolver: zodResolver(updatePasswordSchema),
    });

    const [changePassword] = useUpdatePasswordMutation();

    const alert = useAlertToast();

    const onSubmitHandler = handleSubmit(async (data: ChangePasswordDataType) => {
        const changePasswordData = {
            password: data.oldPassword,
            newPassword: data.password,
        };

        try {
            await changePassword(changePasswordData).unwrap();
            alert(
                {
                    status: 'success',
                    title: USERS_ALERTS.updatePasswordSuccess,
                },
                false,
            );
            reset();
            onCLose();
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);

            if (statusCode === 400) {
                alert(
                    {
                        status: ALERT_STATUSES.error,
                        title: USERS_ALERTS.updatePasswordError,
                        description: USERS_ALERTS.tryAgain,
                    },
                    false,
                );
                setError('oldPassword', { message: 'ERROR' });
                return;
            }
            alert(defaultAlert, false);
        }
    });

    return (
        <CustomModal onClose={onCLose} isOpen={isOpen} width={{ base: '316px', xl: '396px' }}>
            <form onSubmit={onSubmitHandler}>
                <VStack width='100%' padding='32px' alignItems='center' gap='24px'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Сменить пароль
                    </Text>
                    <VStack gap='24px' width='100%' mb='12px'>
                        <AuthPasswordInput
                            dataTestId=''
                            register={register('oldPassword')}
                            isInvalid={!!errors?.oldPassword?.message}
                            placeholder='Старый пароль'
                            label='Введите старый пароль'
                            width='100%'
                        />
                        <AuthPasswordInput
                            dataTestId=''
                            register={register('password')}
                            isInvalid={!!errors?.password?.message}
                            placeholder='Новый пароль'
                            label='Введите новый пароль'
                            hint='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                            width='100%'
                        />
                        <AuthPasswordInput
                            dataTestId=''
                            register={register('passwordConfirm')}
                            isInvalid={!!errors?.passwordConfirm?.message}
                            placeholder='Пароль'
                            label='Повторите пароль'
                            width='100%'
                        />
                    </VStack>
                    <Button
                        onClick={onSubmitHandler}
                        width='100%'
                        size='lg'
                        backgroundColor='#000'
                        color='#fff'
                    >
                        Сохранить пароль
                    </Button>
                </VStack>
            </form>
        </CustomModal>
    );
};
