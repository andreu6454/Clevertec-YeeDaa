import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

interface MobileLayoutProps {
    header: ReactNode;
    content: ReactNode;
    footer: ReactNode;
}

export const MobileLayout = (props: MobileLayoutProps) => {
    const { header, footer, content } = props;

    return (
        <Box width='100vw' height='100vh'>
            {header}
            {footer}
            {content}
        </Box>
    );
};
