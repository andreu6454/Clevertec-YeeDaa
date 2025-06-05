import { Box, HamburgerIcon, IconButton, useMediaQuery } from '@chakra-ui/icons';
import { CloseButton, Image, Link } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import LogoLarge from '~/assets/svg/LogoLarge.svg';
import LogoSmall from '~/assets/svg/LogoSmall.svg';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu, isBurgerOpenSelector, openBurgerMenu } from '~/store/slices/app-slice';
import { ReactionsBar } from '~/widgets/ReactionsBar/ReactionsBar';

export const HeaderMobile = () => {
    const [isTablet] = useMediaQuery('(min-width: 768px)');
    const navigate = useNavigate();

    const image = isTablet ? LogoLarge : LogoSmall;
    const dispatch = useAppDispatch();
    const isBurgerOpen = useAppSelector(isBurgerOpenSelector);

    const openMenuHandler = () => {
        dispatch(openBurgerMenu());
    };

    const closeMenuHandler = () => {
        dispatch(closeBurgerMenu());
    };

    const handleClick = () => {
        navigate(APP_PATHS.root, { replace: true });
    };

    return (
        <Box
            zIndex={10}
            position='fixed'
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            padding='8px 16px'
            width='100vw'
            backgroundColor={isBurgerOpen ? 'white' : '#ffffd3'}
            height='64px'
        >
            <Link data-test-id={DATA_TEST_IDS.headerLogo} onClick={handleClick} flexShrink={0}>
                <Image height='32px' src={image} alt='yee-daa' />
            </Link>
            <Box display='flex' alignItems='center' justifyContent='space-between'>
                {!isBurgerOpen && <ReactionsBar />}
                {isBurgerOpen ? (
                    <IconButton
                        data-test-id='close-icon'
                        onClick={closeMenuHandler}
                        size='lg'
                        variant='ghost'
                        aria-label='menu'
                        icon={<CloseButton as='div' />}
                    />
                ) : (
                    <IconButton
                        data-test-id='hamburger-icon'
                        onClick={openMenuHandler}
                        size='lg'
                        variant='ghost'
                        aria-label='menu'
                        icon={<HamburgerIcon boxSize='24px' color='black' />}
                    />
                )}
            </Box>
        </Box>
    );
};
