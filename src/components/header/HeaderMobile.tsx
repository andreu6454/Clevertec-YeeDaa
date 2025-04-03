import { Box, HamburgerIcon, IconButton, useMediaQuery } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';

import LogoLarge from '~/assets/LogoLarge.svg';
import LogoSmall from '~/assets/LogoSmall.svg';
import { ReactionCount } from '~/shared/ReactionCount/ReactionCount';

export const HeaderMobile = () => {
    const [isTablet] = useMediaQuery('(min-width: 768px)');

    const image = isTablet ? LogoLarge : LogoSmall;

    const paddingsReactionBox = isTablet ? '0 16px' : '0 8px';

    return (
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding='8px 16px'
            width='100%'
            backgroundColor='#ffffd3'
            height='64px'
        >
            <Image height='32px' src={image} alt='yee-daa' />
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                <Box display='flex' padding={paddingsReactionBox}>
                    <ReactionCount variant='bookmark' count={185} />
                    <ReactionCount variant='people' count={589} />
                    <ReactionCount variant='emoji' count={587} />
                </Box>
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
