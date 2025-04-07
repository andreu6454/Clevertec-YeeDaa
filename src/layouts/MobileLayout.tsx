import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

import { BackGround } from '~/components/Background/BackGround';
import { useScreenSize } from '~/hooks/useScreenSize';

interface MobileLayoutProps {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
}

export const MobileLayout = (props: MobileLayoutProps) => {
    const { header, footer, content } = props;

    const { isMobile } = useScreenSize();

    const padding = isMobile ? '80px 16px 16px 16px' : '80px 21px 21px 21px';

    return (
        <Box width='100vw' minHeight='100vh'>
            <BackGround />
            {header}
            <Box width='100%' height='100%' padding={padding}>
                {content}
            </Box>
            {footer}
        </Box>
    );
};
