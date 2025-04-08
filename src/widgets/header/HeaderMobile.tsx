import { Box, HamburgerIcon, IconButton, useMediaQuery } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';

import LogoLarge from '~/assets/svg/LogoLarge.svg';
import LogoSmall from '~/assets/svg/LogoSmall.svg';
import { ReactionsBar } from '~/widgets/ReactionsBar/ReactionsBar';

export const HeaderMobile = () => {
    const [isTablet] = useMediaQuery('(min-width: 768px)');

    const image = isTablet ? LogoLarge : LogoSmall;

    return (
        <Box
            zIndex={10}
            position='fixed'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding='8px 16px'
            width='100vw'
            backgroundColor='#ffffd3'
            height='64px'
        >
            <Image height='32px' src={image} alt='yee-daa' />
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <ReactionsBar />
                <IconButton
                    size='lg'
                    variant='ghost'
                    aria-label='menu'
                    icon={<HamburgerIcon boxSize='24px' color='black' />}
                />
            </Box>
        </Box>
    );
};
