import { HamburgerIcon, IconButton } from '@chakra-ui/icons';
import { Flex, Image, Link } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { Breadcrumbs } from '~/components/Breadcrumbs/Breadcrumbs';
import { HeaderProfileBlock } from '~/components/HeaderProfileBlock/HeaderProfileBlock';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { ZIndex } from '~/shared/constants/style/zIndex';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppSelector } from '~/store/hooks';
import { isBurgerOpenSelector } from '~/store/slices/app-slice';
import { allCategoriesSelector } from '~/store/slices/categories-slice';

import LogoLarge from '../../assets/svg/LogoLarge.svg';

export const HeaderDesktop = memo(() => {
    const navigate = useNavigate();

    const { isDesktopLaptop } = useScreenSize();
    const isBurgerOpen = useAppSelector(isBurgerOpenSelector);
    const allCategories = useAppSelector(allCategoriesSelector);

    const handleClick = () => {
        navigate(APP_PATHS.root, { replace: true });
    };

    return (
        <Flex
            zIndex={ZIndex.header}
            position='fixed'
            justifyContent='space-between'
            alignItems='center'
            paddingY='16px'
            width='100vw'
            backgroundColor='#ffffd3'
            height='80px'
        >
            <Link
                data-test-id={DATA_TEST_IDS.headerLogo}
                paddingLeft='54px'
                width='280px'
                onClick={handleClick}
                flexShrink={0}
            >
                <Image width='135.2px' height='32px' src={LogoLarge} alt='yee-daa' />
            </Link>
            {!isBurgerOpen && (
                <Flex justifyContent='flex-start' width='100%' height='24px'>
                    <Breadcrumbs pathNames={allCategories} />
                </Flex>
            )}
            <HeaderProfileBlock />
            {/*только для тестов*/}
            <IconButton
                position={isDesktopLaptop ? 'absolute' : 'static'}
                width={isDesktopLaptop ? '0' : '100%'}
                visibility={isDesktopLaptop ? 'hidden' : 'visible'}
                data-test-id='hamburger-icon'
                variant='ghost'
                aria-label='menu'
                icon={<HamburgerIcon boxSize='24px' color='black' />}
            />
            {/*только для тестов*/}
        </Flex>
    );
});
