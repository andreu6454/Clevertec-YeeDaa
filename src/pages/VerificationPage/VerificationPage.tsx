import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { APP_PATHS } from '~/shared/constants/pathes';
import { useAppDispatch } from '~/store/hooks';
import { setEmailVerification } from '~/store/slices/app-slice';

export const VerificationPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const emailVerified = searchParams.get('emailVerified');

    useEffect(() => {
        if (emailVerified === 'true') {
            dispatch(setEmailVerification(true));
            navigate(APP_PATHS.login);
            return;
        }
        if (emailVerified === 'false') {
            dispatch(setEmailVerification(false));
            navigate(APP_PATHS.signUp);
            return;
        }
        navigate(APP_PATHS.signUp);
        return;
    }, [emailVerified, navigate]);

    return null;
};
