import { Dispatch, SetStateAction } from 'react';

import { ForgotPassword } from '~/pages/LoginPage/PasswordRecovery/RecoveryPasswordModal/Steps/ForgotPassword';
import { ResetPassword } from '~/pages/LoginPage/PasswordRecovery/RecoveryPasswordModal/Steps/RessetPassword';
import { VerifyOtp } from '~/pages/LoginPage/PasswordRecovery/RecoveryPasswordModal/Steps/VerifyOTP';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';

type RecoveryPasswordModalProps = {
    isOpen: boolean;
    onClose: () => void;
    step: number;
    setEmail: Dispatch<SetStateAction<string>>;
    email: string;
    setStep: Dispatch<SetStateAction<number>>;
};

const width = {
    Desktop: '396px',
    Laptop: '396px',
    Tablet: '316px',
    Mobile: '316px',
};

export const RecoveryPasswordModal = (props: RecoveryPasswordModalProps) => {
    const { isOpen, onClose, setStep, step, setEmail, email } = props;

    const { screenSize } = useScreenSize();

    const recoverySteps = [
        <ForgotPassword setStep={setStep} setEmail={setEmail} />,
        <VerifyOtp email={email} setStep={setStep} />,
        <ResetPassword email={email} onClose={onClose} />,
    ];

    return (
        <CustomModal isOpen={isOpen} onClose={onClose} width={width[screenSize]}>
            {recoverySteps[step]}
        </CustomModal>
    );
};
