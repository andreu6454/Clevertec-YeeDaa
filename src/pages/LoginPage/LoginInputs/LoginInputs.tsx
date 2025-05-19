import { Flex } from '@chakra-ui/react';
import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { LoginFormDataType } from '~/pages/LoginPage/LoginPage';
import { AuthFormInput } from '~/shared/ui/AuthFormInput/AuthFormInput';
import { AuthPasswordInput } from '~/shared/ui/AuthPasswordInput/AuthPasswordInput';

type LoginInputsProps = {
    register: UseFormRegister<LoginFormDataType>;
    errors: FieldErrors<LoginFormDataType>;
    setValue: SetFieldValue<FieldValues>;
};

export const LoginInputs = (props: LoginInputsProps) => {
    const { register, errors, setValue } = props;

    return (
        <Flex flexDirection='column' gap='24px' width='100%'>
            <AuthFormInput
                register={register('login')}
                placeholder='Введите логин'
                error={errors.login?.message}
                isInvalid={!!errors.login}
                label='Логин для входа на сайт'
                hint={errors.login ? 'Логин не менее 5 символов, только латиница' : ''}
                testId='login'
                setValue={setValue}
            />
            <AuthPasswordInput
                register={register('password')}
                placeholder='Введите пароль'
                label='Пароль'
                error={errors.password?.message}
                isInvalid={!!errors.password}
                hint={
                    errors.password ? 'Пароль не менее 8 символов, с заглавной буквой и цифрой' : ''
                }
                testId='password'
            />
        </Flex>
    );
};
