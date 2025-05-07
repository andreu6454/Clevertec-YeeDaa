import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

import { ScrollToTop } from '~/components/ScrollToTop/ScrollToTop';
import { ErrorAlert } from '~/shared/ui/ErrorAlert/ErrorAlert';
import Footer from '~/widgets/footer/Footer';

interface DesktopLaptopLayoutProps {
    header: ReactNode;
    content: ReactNode;
    sidebar: ReactNode;
    navbar: ReactNode;
}

export const DesktopLaptopLayout = (props: DesktopLaptopLayoutProps) => {
    const { header, content, sidebar, navbar } = props;
    return (
        <Box overflowX='hidden' width='100%' min-height='100vh'>
            {header}
            {/*<BackGround />*/}
            <Box
                overflowY='auto'
                padding='80px 272px 0 280px'
                min-height='100vh'
                width='100%'
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                {navbar}
                {content}
                {sidebar}
            </Box>
            <ScrollToTop />
            <ErrorAlert />
            <Footer />
        </Box>
    );
};
