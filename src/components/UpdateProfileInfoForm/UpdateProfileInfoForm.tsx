import { Flex } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form';

import { UserInputDataType } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/UpdateProfileInfoBlock/UpdateProfileInfo';
import { AuthFormInput } from '~/shared/ui/AuthFormInput/AuthFormInput';

type UpdateProfileInfoFormProps = {
    setValue: UseFormSetValue<UserInputDataType>;
    register: UseFormRegister<UserInputDataType>;
    errors: FieldErrors<UserInputDataType>;
};

export const UpdateProfileInfoForm = (props: UpdateProfileInfoFormProps) => {
    const { setValue, register, errors } = props;

    return (
        <Flex flexWrap='wrap' gap='24px'>
            <AuthFormInput
                dataTestId=''
                label='Имя'
                placeholder=''
                setValue={setValue}
                register={register('firstName')}
                isInvalid={!!errors.firstName}
                error={errors?.firstName?.message}
            />
            <AuthFormInput
                dataTestId=''
                label='Фамилия'
                placeholder=''
                setValue={setValue}
                register={register('lastName')}
                error={errors?.lastName?.message}
                isInvalid={!!errors.lastName}
            />
            <AuthFormInput
                dataTestId=''
                label='E-mail'
                placeholder=''
                setValue={setValue}
                register={register('email')}
                isInvalid={false}
                isDisabled
            />
            <AuthFormInput
                dataTestId=''
                label='Логин'
                placeholder=''
                setValue={setValue}
                register={register('login')}
                isInvalid={false}
                isDisabled
                hint='Логин не менее 5 символов, только латиница'
            />
        </Flex>
    );
};
