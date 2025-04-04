import { useMediaQuery } from '@chakra-ui/icons';
import { FC, memo } from 'react';

import Footer from '~/components/footer/Footer';
import Header from '~/components/header/Header';
import { DesktopLaptopLayout } from '~/layouts/DesktopLaptopLayout';
import { MobileLayout } from '~/layouts/MobileLayout';

export const MainPage: FC = memo(() => {
    const [isDesktopOrLaptop] = useMediaQuery('(min-width: 1440px)');

    return isDesktopOrLaptop ? (
        <DesktopLaptopLayout header={<Header />} />
    ) : (
        <MobileLayout header={<Header />} content={<></>} footer={<Footer />} />
    );
});
