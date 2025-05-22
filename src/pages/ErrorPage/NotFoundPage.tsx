import { Image } from '@chakra-ui/icons';
import { Flex, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Link as ReactLink } from 'react-router';

import { useScreenSize } from '~/shared/hooks/useScreenSize';

import ErrorPageImage from '../../assets/errorPageImage.png';

const sizes = {
    Desktop: {
        width: '396px',
        height: '374px',
        imgSize: '206px',
        textWidth: '396px',
    },
    Laptop: {
        width: '396px',
        height: '374px',
        imgSize: '206px',
        textWidth: '396px',
    },
    Tablet: {
        width: '396px',
        height: '374px',
        imgSize: '108px',
        textWidth: '230px',
    },
    Mobile: {
        width: '396px',
        height: '374px',
        imgSize: '108px',
        textWidth: '230px',
    },
};

export const NotFoundPage = memo(() => {
    const { screenSize, isDesktopLaptop } = useScreenSize();

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
                width={sizes[screenSize].width}
                height={sizes[screenSize].height}
                alignItems='center'
                gap='32px'
            >
                <Image
                    width={sizes[screenSize].imgSize}
                    height={sizes[screenSize].imgSize}
                    src={ErrorPageImage}
                    alt='404'
                />
                <Flex direction='column' gap='16px'>
                    <Flex
                        width={sizes[screenSize].textWidth}
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
                        width={sizes[screenSize].textWidth}
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
                            to='/'
                        >
                            здесь.
                        </Link>
                    </Text>
                </Flex>
            </Flex>
        </Flex>
    );
});
