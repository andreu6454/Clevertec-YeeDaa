import { Flex } from '@chakra-ui/react';
import { FieldErrors, FieldValues, SetFieldValue, UseFormRegister } from 'react-hook-form';

import { RegisterFormDataType } from '~/pages/RegistrationPage/RegistrationPage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { AuthFormInput } from '~/shared/ui/AuthFormInput/AuthFormInput';

type FirstStepInputsProps = {
    register: UseFormRegister<RegisterFormDataType>;
    errors: FieldErrors<RegisterFormDataType>;
    setValue: SetFieldValue<FieldValues>;
};

export const FirstStepInputs = (props: FirstStepInputsProps) => {
    const { register, errors, setValue } = props;

    return (
        <Flex flexDirection='column' gap='24px'>
            <AuthFormInput
                register={register('firstName')}
                placeholder='Введите имя'
                error={errors.firstName?.message}
                isInvalid={!!errors.firstName}
                label='Ваше имя'
                dataTestId={DATA_TEST_IDS.firstNameInput}
                setValue={setValue}
            />
            <AuthFormInput
                register={register('lastName')}
                placeholder='Введите фамилию'
                error={errors.lastName?.message}
                isInvalid={!!errors.lastName}
                label='Вашa фамилия'
                dataTestId={DATA_TEST_IDS.lastNameInput}
                setValue={setValue}
            />
            <AuthFormInput
                register={register('email')}
                placeholder='Введите e-mail'
                error={errors.email?.message}
                isInvalid={!!errors.email}
                label='Ваш e-mail'
                dataTestId={DATA_TEST_IDS.emailInput}
                setValue={setValue}
            />
        </Flex>
    );
};
