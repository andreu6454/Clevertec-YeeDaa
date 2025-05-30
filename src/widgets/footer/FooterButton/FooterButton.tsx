import { Box } from '@chakra-ui/icons';
import { Link } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Link as ReactLink } from 'react-router';

interface FooterButtonProps {
    icon: ReactNode;
    title: string;
    isActive?: boolean;
    path?: string;
}

const FooterButton = (props: FooterButtonProps) => {
    const { icon, title, isActive, path } = props;

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
            <Box as={ReactLink} to={path}>
                {icon}
            </Box>
            {isActive ? (
                <Link
                    as={ReactLink}
                    to={path}
                    fontWeight={500}
                    fontSize='12px'
                    lineHeight='133%'
                    textAlign='center'
                    color='#000'
                >
                    {title}
                </Link>
            ) : (
                <Link
                    as={ReactLink}
                    to={path}
                    fontWeight={400}
                    fontSize='12px'
                    lineHeight='133%'
                    textAlign='center'
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {title}
                </Link>
            )}
        </Box>
    );
};

export default FooterButton;
