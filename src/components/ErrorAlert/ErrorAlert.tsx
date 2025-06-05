import { Alert, Box, Image } from '@chakra-ui/icons';
import { AlertTitle, CloseButton, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { appErrorSelector, setAppError } from '~/store/slices/app-slice';

import AlertIcon from '../../assets/svg/AlertIcon.svg';

const sizes = {
    Desktop: {
        left: '37%',
        bottom: '75px',
        width: '400px',
        right: '-5',
    },
    Laptop: {
        left: '37%',
        bottom: '75px',
        width: '400px',
        right: '-5',
    },
    Tablet: {
        left: '32%',
        bottom: '100px',
        width: '328px',
        right: '-2',
    },
    Mobile: {
        left: '16px',
        bottom: '100px',
        width: '328px',
        right: '-2',
    },
};

export const ErrorAlert = () => {
    const error = useAppSelector(appErrorSelector);
    const dispatch = useAppDispatch();

    const { screenSize } = useScreenSize();

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
            left={sizes[screenSize].left}
            bottom={sizes[screenSize].bottom}
            gap='12px'
            variant='error'
            padding='12px 16px'
            width={sizes[screenSize].width}
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
                right={sizes[screenSize].right}
                top={-1}
                onClick={onCloseHandler}
            />
        </Alert>
    );
};
