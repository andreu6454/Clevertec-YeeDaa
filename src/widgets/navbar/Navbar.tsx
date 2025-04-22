import { Box } from '@chakra-ui/icons';
import { memo } from 'react';

import { NavbarData } from '~/widgets/navbar/NavbarData/NavbarData';

export const Navbar = memo(() => (
    <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        position='fixed'
        left='0'
        top='80px'
        height='calc(100% - 80px)'
        width='256px'
        paddingTop='24px'
    >
        <NavbarData />
    </Box>
));
