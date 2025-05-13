import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { FirstStepInputs } from '~/pages/RegistrationPage/FirstStepInputs/FirstStepInputs';
import { RegistrationButtons } from '~/pages/RegistrationPage/RegistrationButtons/RegistrationButtons';
import { RegistrationProgress } from '~/pages/RegistrationPage/RegistrationProgress/RegistrationProgress';
import { SecondStepInputs } from '~/pages/RegistrationPage/SecondStepInputs/SecondStepInputs';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';

export const RegistrationPage = () => {
    const [step, setStep] = useState(1);

    return (
        <AuthLayout>
            <Flex flexDirection='column' gap='48px' width='100%'>
                <Flex flexDirection='column' gap='24px'>
                    <RegistrationProgress step={step} />
                    {step === 1 && <FirstStepInputs />}
                    {step === 2 && <SecondStepInputs />}
                </Flex>
                <RegistrationButtons step={step} setStep={setStep} />
            </Flex>
        </AuthLayout>
    );
};
