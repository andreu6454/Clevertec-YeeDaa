import { Image } from '@chakra-ui/icons';
import { Flex, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Link as ReactLink } from 'react-router';

import { APP_PATHS } from '~/shared/constants/pathes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

import ErrorPageImage from '../../assets/errorPageImage.png';

export const NotFoundPage = memo(() => {
    const { isDesktopLaptop } = useScreenSize();

    return (
        <Flex
            width='100%'
            height={isDesktopLaptop ? 'calc(100vh - 180px)' : 'calc(100vh - 64px - 100px)'}
            justifyContent='center'
            alignItems='center'
        >
            <Flex
                padding='32px'
                direction='column'
                width={{ base: '396px' }}
                height='374px'
                alignItems='center'
                gap='32px'
            >
                <Image
                    width={{ base: '108px', xl: '206px' }}
                    height={{ base: '108px', xl: '206px' }}
                    src={ErrorPageImage}
                    alt='404'
                />
                <Flex direction='column' gap='16px'>
                    <Flex
                        width={{ base: ' 230px', xl: '396px' }}
                        fontWeight='700'
                        fontSize='24px'
                        lineHeight='133%'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <h1
                            style={{
                                textAlign: 'center',
                            }}
                        >
                            Упс! Такой страницы нет
                        </h1>
                    </Flex>
                    <Text
                        width={{ base: ' 230px', xl: '396px' }}
                        fontWeight='400'
                        fontSize='16px'
                        lineHeight='150%'
                        textAlign='center'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        {'Можете поискать другой рецепт '}
                        <Link
                            data-test-id='error-page-go-home'
                            as={ReactLink}
                            textDecoration='underline'
                            to={APP_PATHS.root}
                        >
                            здесь.
                        </Link>
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
});
