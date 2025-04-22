import { useMediaQuery } from '@chakra-ui/react';

export const useScreenSize = () => {
    const [isMobile] = useMediaQuery('(max-width: 767px)');
    const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
    const [isLaptop] = useMediaQuery('(min-width: 1440px) and (max-width: 1919px)');
    const [isDesktop] = useMediaQuery('(min-width: 1920px)');

    const isDesktopLaptop = isDesktop || isLaptop;
    const isTabletMobile = isMobile || isTablet;

    let screenSize: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile' = 'Desktop';

    if (isLaptop) {
        screenSize = 'Laptop';
    } else if (isTablet) {
        screenSize = 'Tablet';
    } else if (isMobile) {
        screenSize = 'Mobile';
    }
    return { isMobile, isTablet, isLaptop, isDesktop, screenSize, isDesktopLaptop, isTabletMobile };
};
