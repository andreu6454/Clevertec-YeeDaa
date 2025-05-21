import { Flex } from '@chakra-ui/react';
import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { LoginFormDataType } from '~/pages/LoginPage/LoginPage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
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
                dataTestId={DATA_TEST_IDS.loginInput}
                setValue={setValue}
            />
            <AuthPasswordInput
                data-test-id={DATA_TEST_IDS.passwordInput}
                register={register('password')}
                placeholder='Введите пароль'
                label='Пароль'
                error={errors.password?.message}
                isInvalid={!!errors.password}
                hint={
                    errors.password ? 'Пароль не менее 8 символов, с заглавной буквой и цифрой' : ''
                }
                dataTestId={DATA_TEST_IDS.passwordInput}
            />
        </Flex>
    );
};
