import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

import { ScrollToTop } from '~/components/ScrollToTop/ScrollToTop';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { BurgerMenu } from '~/widgets/BurgerMenu/BurgerMenu';

interface MobileLayoutProps {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
}

export const MobileLayout = (props: MobileLayoutProps) => {
    const { header, footer, content } = props;

    const { isMobile } = useScreenSize();

    const padding = isMobile ? '64px 16px 100px 16px' : '64px 12px 100px 20px';

    return (
        <Box width='100%' minHeight='100vh' overflowX='hidden'>
            {/*<BackGround />*/}
            {header}
            <Box width='100%' height='100%' padding={padding}>
                {content}
            </Box>
            {footer}
            <ScrollToTop />
            <BurgerMenu />
        </Box>
    );
};
