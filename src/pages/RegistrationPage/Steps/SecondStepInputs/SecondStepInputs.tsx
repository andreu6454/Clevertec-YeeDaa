import { Flex } from '@chakra-ui/react';
import { memo } from 'react';
import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { AccountRecoveryType } from '~/pages/LoginPage/PasswordRecovery/RecoveryPasswordModal/Steps/RessetPassword';
import { RegisterFormDataType } from '~/pages/RegistrationPage/RegistrationPage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { AuthFormInput } from '~/shared/ui/AuthFormInput/AuthFormInput';
import { AuthPasswordInput } from '~/shared/ui/AuthPasswordInput/AuthPasswordInput';

type SecondStepInputsProps = {
    register: UseFormRegister<RegisterFormDataType | AccountRecoveryType>;
    errors: FieldErrors<RegisterFormDataType | AccountRecoveryType>;
    setValue: SetFieldValue<FieldValues>;
};

export const SecondStepInputs = memo((props: SecondStepInputsProps) => {
    const { register, errors, setValue } = props;

    return (
        <Flex flexDirection='column' gap='24px' width='100%'>
            <AuthFormInput
                register={register('login')}
                placeholder='Логин'
                error={errors.login?.message}
                isInvalid={!!errors.login}
                label='Логин для входа на сайт'
                hint={errors.login ? 'Логин не менее 5 символов, только латиница и !@#$&_+-.' : ''}
                dataTestId={DATA_TEST_IDS.loginInput}
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
                dataTestId={DATA_TEST_IDS.passwordInput}
            />
            <AuthPasswordInput
                register={register('passwordConfirm')}
                placeholder='Повторите пароль'
                label='Повторите пароль'
                error={errors.passwordConfirm?.message}
                isInvalid={!!errors.passwordConfirm}
                dataTestId={DATA_TEST_IDS.confirmPasswordInput}
            />
        </Flex>
    );
});
