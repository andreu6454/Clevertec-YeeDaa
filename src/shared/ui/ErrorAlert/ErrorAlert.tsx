import { Alert, Box, Image } from '@chakra-ui/icons';
import { AlertTitle, CloseButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { appErrorSelector, setAppError } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';

import AlertIcon from '../../../assets/svg/AlertIcon.svg';

export const ErrorAlert = () => {
    const error = useAppSelector(appErrorSelector);
    const dispatch = useAppDispatch();

    const [isVisible, setIsVisible] = useState<boolean>(!!error);

    useEffect(() => {
        if (error) {
            setIsVisible(true);
        }
    }, [error]);

    const onCloseHandler = () => {
        dispatch(setAppError(''));
        setIsVisible(false);
    };

    if (!isVisible) {
        return null;
    }

    return (
        <Alert
            data-test-id='error-notification'
            zIndex={3}
            position='fixed'
            left='37%'
            bottom='75px'
            gap='12px'
            variant='error'
            padding='12px 16px'
            width='400px'
            height='72px'
            backgroundColor='#e53e3e'
        >
            <Image src={AlertIcon} />
            <Box>
                <AlertTitle fontWeight='700' fontSize='16px' lineHeight='150%' color='#fff'>
                    Ошибка сервера
                </AlertTitle>
                <Text fontWeight='400' fontSize='16px' lineHeight='150%' color='#fff'>
                    Попробуйте поискать снова попозже
                </Text>
            </Box>
            <CloseButton
                data-test-id='close-alert-button'
                size='sm'
                color='#fff'
                alignSelf='flex-start'
                position='relative'
                right={-5}
                top={-1}
                onClick={onCloseHandler}
            />
        </Alert>
    );
};
