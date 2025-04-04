import { Box, useMediaQuery } from '@chakra-ui/icons';
import { FC, memo } from 'react';

import Footer from '~/components/footer/Footer';
import Header from '~/components/header/Header';
import { Navbar } from '~/components/navbar/Navbar';
import { Sidebar } from '~/components/sidebar/Sidebar';
import { DesktopLaptopLayout } from '~/layouts/DesktopLaptopLayout';
import { MobileLayout } from '~/layouts/MobileLayout';

export const MainPage: FC = memo(() => {
    const [isDesktopOrLaptop] = useMediaQuery('(min-width: 1440px)');

    return isDesktopOrLaptop ? (
        <DesktopLaptopLayout
            header={<Header />}
            navbar={<Navbar />}
            content={<Box></Box>}
            sidebar={<Sidebar />}
        />
    ) : (
        <MobileLayout header={<Header />} content={<></>} footer={<Footer />} />
    );
});
