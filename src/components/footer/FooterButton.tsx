import { Box } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface FooterButtonProps {
    icon: ReactNode;
    title: string;
    isActive?: boolean;
}

const FooterButton = (props: FooterButtonProps) => {
    const { icon, title, isActive } = props;
    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            {icon}
            {isActive ? (
                <Text
                    font-weight={500}
                    font-size='12px'
                    line-height='133%'
                    text-align='center'
                    color='#000'
                >
                    {title}
                </Text>
            ) : (
                <Text
                    font-weight={400}
                    font-size='12px'
                    line-height='133%'
                    text-align='center'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {title}
                </Text>
            )}
        </Box>
    );
};

export default FooterButton;
