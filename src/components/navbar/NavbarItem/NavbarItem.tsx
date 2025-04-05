import { Box, IconButton, Image } from '@chakra-ui/icons';
import { Text } from '@chakra-ui/react';

import ArrowDown from '../../../assets/svg/arrowDown.svg';

interface NavbarItemProps {
    title: string;
    icon: string;
}

export const NavbarItem = (props: NavbarItemProps) => {
    const { title, icon } = props;

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            padding='12px 8px'
            w='230px'
            height='48px'
        >
            <Image marginRight='12px' src={icon} />
            <Text width='150px' fontWeight='500' fontSize='16px' lineHeight='150%' color='#000'>
                {title}
            </Text>
            <IconButton variant='ghost' aria-label={title}>
                <Image src={ArrowDown} />
            </IconButton>
        </Box>
    );
};
