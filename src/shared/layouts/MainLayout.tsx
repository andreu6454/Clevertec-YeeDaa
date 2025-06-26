import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

import { ErrorAlert } from '~/components/ErrorAlert/ErrorAlert';
import { ScrollToTop } from '~/components/ScrollToTop/ScrollToTop';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { BurgerMenu } from '~/widgets/BurgerMenu/BurgerMenu';
import Footer from '~/widgets/footer/Footer';

interface MainLayoutProps {
    header: ReactNode;
    content: ReactNode;
    sidebar: ReactNode;
    navbar: ReactNode;
}

export const MainLayout = (props: MainLayoutProps) => {
    const { header, content, sidebar, navbar } = props;

    const { isDesktopLaptop } = useScreenSize();

    return (
        <Box
            overflowX='hidden'
            width='100%'
            min-height='100vh'
            flexDirection={isDesktopLaptop ? 'row' : 'column'}
        >
            {header}
            <Box
                overflowY='auto'
                padding={{
                    base: '64px 16px 100px 16px',
                    md: '64px 12px 100px 20px',
                    xl: '80px 208px 20px 280px',
                }}
                min-height='100vh'
                width='100%'
                flexDirection={isDesktopLaptop ? 'row' : 'column'}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                overflowX='hidden'
            >
                {isDesktopLaptop && navbar}
                {content}
                {isDesktopLaptop && sidebar}
            </Box>
            <ScrollToTop />
            <ErrorAlert />
            <BurgerMenu />
            <Footer />
        </Box>
    );
};
