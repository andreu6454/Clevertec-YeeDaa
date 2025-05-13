import { Image } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { AuthLinks } from '~/shared/layouts/AuthLayout/AuthLinks';

import AuthImage from '../../../assets/AuthImage.png';
import LogoImage from '../../../assets/svg/LogoLarge.svg';

type AuthLayoutProps = {
    children: ReactNode;
};

const width = {
    Desktop: 'calc(100% - 972px)',
    Laptop: 'calc(100% - 732px)',
    Tablet: '100%',
    Mobile: '100%',
};
const paddings = {
    Desktop: '0 231px 0 256px',
    Laptop: '0 127px 0 130px',
    Tablet: '0 206px 0 206px',
    Mobile: '0 16px 0 16px',
};

export const AuthLayout = (props: AuthLayoutProps) => {
    const { children } = props;

    const { isDesktopLaptop, screenSize } = useScreenSize();

    return (
        <Flex
            background='linear-gradient(208deg, #eaffc7 0%, #29813f 100%)'
            width='100%'
            height='100vh'
            alignItems='center'
        >
            <Flex
                width={width[screenSize]}
                padding={paddings[screenSize]}
                flexDirection='column'
                alignItems='center'
            >
                <Image width='271px' height='64px' src={LogoImage} />
                <AuthLinks />
                {children}
            </Flex>
            {isDesktopLaptop && (
                <Image
                    style={{
                        width: '732px',
                        height: '100%',
                        display: 'block',
                    }}
                    src={AuthImage}
                />
            )}
        </Flex>
    );
};
