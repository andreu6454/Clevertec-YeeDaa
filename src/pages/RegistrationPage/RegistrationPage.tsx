import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ZodType } from 'zod';

import { FirstStepInputs } from '~/pages/RegistrationPage/FirstStepInputs/FirstStepInputs';
import { RegistrationButtons } from '~/pages/RegistrationPage/RegistrationButtons/RegistrationButtons';
import { RegistrationProgress } from '~/pages/RegistrationPage/RegistrationProgress/RegistrationProgress';
import { SecondStepInputs } from '~/pages/RegistrationPage/SecondStepInputs/SecondStepInputs';
import { useSignUpMutation } from '~/query/services/auth';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';
import { userDataSchema, userPasswordSchema } from '~/shared/types/validationSchemas/signUpSchema';

export type RegisterFormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    repeatPassword: string;
};

const signUpSchema: ZodType[] = [userDataSchema, userPasswordSchema];

export const RegistrationPage = () => {
    const [step, setStep] = useState(0);
    const [tempData, setTempData] = useState<RegisterFormDataType>();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<RegisterFormDataType>({
        resolver: zodResolver(signUpSchema[step]),
        mode: 'onBlur',
    });

    const [signUp] = useSignUpMutation();

    const onSubmitHandle = handleSubmit((data) => {
        if (step === 0) {
            setStep(1);
            setTempData({ ...data });
            return;
        }
        const { repeatPassword, ...signUpData } = data;

        signUp({ ...tempData, ...signUpData });
    });

    const stepsInputs = [
        <FirstStepInputs setValue={setValue} errors={errors} register={register} />,
        <SecondStepInputs setValue={setValue} errors={errors} register={register} />,
    ];

    return (
        <AuthLayout>
            <Flex flexDirection='column' width='100%'>
                <form onSubmit={onSubmitHandle}>
                    <Flex flexDirection='column' gap='24px'>
                        <RegistrationProgress step={step} />
                        {stepsInputs[step]}
                    </Flex>
                    <RegistrationButtons onSubmit={onSubmitHandle} step={step} />
                </form>
            </Flex>
        </AuthLayout>
    );
};
