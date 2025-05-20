import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { setEmailVerification } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';

export const VerificationPage = () => {
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const [searchParams] = useSearchParams();

    const emailVerified = searchParams.get('emailVerified');

    useEffect(() => {
        if (emailVerified === 'true') {
            dispatch(setEmailVerification(true));
            navigate('/login');
            return;
        }
        if (emailVerified === 'false') {
            dispatch(setEmailVerification(false));
            navigate('/register');
            return;
        }
        navigate('/register');
        return;
    }, [emailVerified, navigate]);

    return null;
};
