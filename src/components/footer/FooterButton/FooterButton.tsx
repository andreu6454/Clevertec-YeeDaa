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

    const backgroundGradient = isActive
        ? {
              background:
                  'radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)',
          }
        : '';
    return (
        <Box
            sx={backgroundGradient}
            height='80px'
            width='90px'
            display='flex'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
        >
            <Box>{icon}</Box>
            {isActive ? (
                <Text
                    fontWeight={500}
                    fontSize='12px'
                    lineHeight='133%'
                    textAlign='center'
                    color='#000'
                >
                    {title}
                </Text>
            ) : (
                <Text
                    fontWeight={400}
                    fontSize='12px'
                    lineHeight='133%'
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {title}
                </Text>
            )}
        </Box>
    );
};

export default FooterButton;
