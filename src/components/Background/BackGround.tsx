import { Box, Image, useMediaQuery } from '@chakra-ui/icons';

import bg360 from '../../assets/bg360.svg';
import bg768 from '../../assets/bg768.svg';
import bg1440 from '../../assets/bg1440.svg';
import bg1920 from '../../assets/bg1920.svg';

export const BackGround = () => {
    const [isDesktop] = useMediaQuery('(min-width: 1920px)');
    const [isLaptop] = useMediaQuery('(min-width: 1440px) and (max-width: 1919px)');
    const [isTablet] = useMediaQuery('(min-width: 768px) and (max-width: 1439px)');
    const [isMobile] = useMediaQuery('(min-width: 0) and (max-width: 767px)');

    let bg;
    if (isDesktop) {
        bg = bg1920;
    } else if (isLaptop) {
        bg = bg1440;
    } else if (isTablet) {
        bg = bg768;
    } else if (isMobile) {
        bg = bg360;
    }

    if (isMobile || isTablet) {
        return (
            <Box position='fixed' top={0} left={0} w='100vw' h='100vh' zIndex={-1}>
                <Image src={bg} w='100%' h='100%' objectFit='cover' />
            </Box>
        );
    }

    return (
        <Box position='fixed' top={0} left={0} w='100vw' h='100vh' zIndex={-1} display='flex'>
            <Box bg='rgba(255, 149, 149, 0.2);' w='256px' h='100%' marginRight='24px' />
            <Image src={bg} flex={1} h='100%' objectFit='cover' marginRight='73px' />
            <Box bg='rgba(255, 149, 149, 0.2);' w='208px' h='100%' />
        </Box>
    );
};
