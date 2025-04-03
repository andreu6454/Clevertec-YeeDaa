import { useMediaQuery } from '@chakra-ui/icons';

import { HeaderDesktop } from '~/components/header/HeaderDesktop';
import { HeaderMobile } from '~/components/header/HeaderMobile';

const Header = () => {
    const [isDesktopOrLaptop] = useMediaQuery('(min-width: 1440px)');

    return (
        <header data-test-id='header'>
            {isDesktopOrLaptop ? <HeaderDesktop /> : <HeaderMobile />}
        </header>
    );
};

export default Header;
