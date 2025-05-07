import { Flex, Spinner } from '@chakra-ui/react';
import { useEffect } from 'react';

export const FullScreenSpinner = () => {
    useEffect(() => {
        document.body.style.overflow = 'hidden';

        return () => {
            document.body.style.overflow = '';
        };
    }, []);

    return (
        <Flex
            position='fixed'
            top={0}
            left={0}
            zIndex={10}
            backdropFilter='blur(4px)'
            backgroundColor='rgba(0, 0, 0, 0.16)'
            width='100vw'
            height='100vh'
            alignItems='center'
            justifyContent='center'
            // onClick={(e) => e.stopPropagation()}
        >
            <Flex
                alignItems='center'
                justifyContent='center'
                width='206px'
                height='206px'
                background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
            >
                <Spinner data-test-id='app-loader' />
            </Flex>
        </Flex>
    );
};
