import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { UpdateProfileInfoForm } from '~/components/UpdateProfileInfoForm/UpdateProfileInfoForm';
import { ChangePasswordModal } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/UpdateProfileInfoBlock/ChangePasswordModal/ChangePasswordModal';
import { useUpdateInfoMutation } from '~/query/services/users';
import { ALERT_STATUSES, defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { userProfileSchema } from '~/shared/types/validationSchemas/userProfileSchema';

export type UserInputDataType = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
};

export const UpdateProfileInfo = (props: UserInputDataType) => {
    const { firstName, lastName, login, email } = props;

    const alert = useAlertToast();
    const { isOpen, onClose, onOpen } = useDisclosure();

    const [updateInfo] = useUpdateInfoMutation();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<UserInputDataType>({
        defaultValues: {
            firstName,
            lastName,
            login,
            email,
        },
        resolver: zodResolver(userProfileSchema),
    });

    const onSubmitHandler = handleSubmit(async (data: UserInputDataType) => {
        const updateInfoBody = {
            firstName: data.firstName,
            lastName: data.lastName,
        };
        try {
            await updateInfo(updateInfoBody).unwrap();
            alert(
                {
                    status: ALERT_STATUSES.success,
                    title: USERS_ALERTS.updateInfoSuccess,
                },
                false,
            );
        } catch {
            alert(defaultAlert, false);
        }
    });

    return (
        <form onSubmit={onSubmitHandler}>
            <Flex flexDirection='column' gap='24px'>
                <UpdateProfileInfoForm errors={errors} register={register} setValue={setValue} />
                <Button
                    onClick={() => onOpen()}
                    width='max-content'
                    size='lg'
                    variant='ghost'
                    padding='10px'
                >
                    Сменить пароль
                </Button>
                <Button
                    onClick={onSubmitHandler}
                    width='max-content'
                    size='lg'
                    backgroundColor='#000'
                    color='#fff'
                >
                    Сохранить изменения
                </Button>
                <ChangePasswordModal isOpen={isOpen} onCLose={onClose} />
            </Flex>
        </form>
    );
};
