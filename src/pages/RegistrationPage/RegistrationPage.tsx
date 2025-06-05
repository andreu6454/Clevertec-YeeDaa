import { Flex, useDisclosure } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm, UseFormRegister } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { ZodType } from 'zod';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { AccountRecoveryType } from '~/pages/LoginPage/PasswordRecovery/RecoveryPasswordModal/Steps/RessetPassword';
import { RegisterSuccessModal } from '~/pages/RegistrationPage/Modals/RegisterSuccessModal';
import { VerificationErrorModal } from '~/pages/RegistrationPage/Modals/VerificationErrorModal';
import { RegistrationButtons } from '~/pages/RegistrationPage/RegistrationButtons/RegistrationButtons';
import { RegistrationProgress } from '~/pages/RegistrationPage/RegistrationProgress/RegistrationProgress';
import { FirstStepInputs } from '~/pages/RegistrationPage/Steps/FirstStepInputs/FirstStepInputs';
import { SecondStepInputs } from '~/pages/RegistrationPage/Steps/SecondStepInputs/SecondStepInputs';
import { useSignUpMutation } from '~/query/services/auth';
import { ErrorResponse } from '~/query/types/types';
import { EMAIL_EXISTS, LOGIN_EXISTS } from '~/shared/constants/alertStatuses/authStatuses';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';
import { userDataSchema, userPasswordSchema } from '~/shared/types/validationSchemas/signUpSchema';
import { getValidatedCount } from '~/shared/utils/getValidatedCount';
import { useAppSelector } from '~/store/hooks';
import { emailVerifiedSelector } from '~/store/slices/app-slice';

export type RegisterFormDataType = {
    firstName: string;
    lastName: string;
    email: string;
    login: string;
    password: string;
    passwordConfirm: string;
};

const INPUT_COUNT = 6;
const signUpSchema: ZodType[] = [userDataSchema, userPasswordSchema];

export const RegistrationPage = () => {
    const [step, setStep] = useState(0);
    const [tempData, setTempData] = useState<RegisterFormDataType>();
    const [email, setEmail] = useState('');
    const isVerified = useAppSelector(emailVerifiedSelector);

    const alertToast = useAlertToast();
    const navigate = useNavigate();

    useEffect(() => {
        if (isVerified === false) {
            onVerificationOpen();
        }
    }, [isVerified]);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isVerificationOpen,
        onOpen: onVerificationOpen,
        onClose: onVerificationClose,
    } = useDisclosure();

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, dirtyFields },
    } = useForm<RegisterFormDataType>({
        resolver: zodResolver(signUpSchema[step]),
        mode: 'onChange',
    });

    const [signUp, { isLoading }] = useSignUpMutation();

    const onSubmitHandle = handleSubmit(async (data) => {
        if (step === 0) {
            setStep(1);
            setEmail(data.email);
            setTempData({ ...data });
            return;
        }
        const { passwordConfirm, ...signUpData } = data;

        try {
            await signUp({ ...tempData, ...signUpData }).unwrap();
            onOpen();
        } catch (error) {
            const responseError = error as ErrorResponse;
            const statusCode = Number(responseError.status);
            const errorMessage = responseError.data.message;

            if (statusCode === 400 && errorMessage === LOGIN_EXISTS) {
                alertToast({
                    status: 'error',
                    title: LOGIN_EXISTS,
                });
            }
            if (statusCode === 400 && errorMessage === EMAIL_EXISTS) {
                alertToast({
                    status: 'error',
                    title: EMAIL_EXISTS,
                });
            }
            if (statusCode >= 500) {
                alertToast({
                    status: 'error',
                    title: 'Ошибка сервера',
                    description: 'Попробуйте немного позже',
                });
            }
        }
    });

    const validatedCount = getValidatedCount<RegisterFormDataType>(dirtyFields, errors);

    const registrationProgress = Math.round((validatedCount * 100) / INPUT_COUNT);

    const stepsInputs = [
        <FirstStepInputs setValue={setValue} errors={errors} register={register} />,
        <SecondStepInputs
            setValue={setValue}
            errors={errors}
            register={register as UseFormRegister<RegisterFormDataType | AccountRecoveryType>}
        />,
    ];
    const onCloseHandler = () => {
        onClose();
        navigate(APP_PATHS.login);
    };

    return (
        <AuthLayout>
            <Flex flexDirection='column' width='100%'>
                <form onSubmit={onSubmitHandle} data-test-id={DATA_TEST_IDS.signUpForm}>
                    <Flex flexDirection='column' gap='24px'>
                        <RegistrationProgress
                            registrationProgress={registrationProgress}
                            step={step}
                        />
                        {stepsInputs[step]}
                    </Flex>
                    <RegistrationButtons onSubmit={onSubmitHandle} step={step} />
                </form>
            </Flex>
            <RegisterSuccessModal isOpen={isOpen} onClose={onCloseHandler} email={email} />
            <VerificationErrorModal isOpen={isVerificationOpen} onClose={onVerificationClose} />
            {isLoading && <FullScreenSpinner />}
        </AuthLayout>
    );
};
