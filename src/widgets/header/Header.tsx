import { useScreenSize } from '~/hooks/useScreenSize';
import { HeaderDesktop } from '~/widgets/header/HeaderDesktop';
import { HeaderMobile } from '~/widgets/header/HeaderMobile';

const Header = () => {
    const { isDesktop, isLaptop } = useScreenSize();

    return (
        <header data-test-id='header'>
            {isDesktop || isLaptop ? <HeaderDesktop /> : <HeaderMobile />}
        </header>
    );
};

export default Header;
