import { Box } from '@chakra-ui/icons';
import { ReactNode } from 'react';

interface DesktopLaptopLayoutProps {
    header?: ReactNode;
    content?: ReactNode;
}

export const DesktopLaptopLayout = (props: DesktopLaptopLayoutProps) => {
    const { header, content } = props;
    return (
        <Box width='100%' height='100vh'>
            {header}
            {content}
        </Box>
    );
};
