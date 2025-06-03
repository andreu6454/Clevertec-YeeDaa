import { Flex, Spinner } from '@chakra-ui/react';

export const AuthorInfoLoader = () => (
    <Flex
        alignItems='center'
        justifyContent='center'
        width={{ base: '150px' }}
        height={{ base: '228px', md: '100px', xl: '128px' }}
        position='absolute'
        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
    >
        <Spinner data-test-id='app-loader' />
    </Flex>
);
