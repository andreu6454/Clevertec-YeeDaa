import { Box, IconButton } from '@chakra-ui/icons';
import { Image } from '@chakra-ui/react';

import LeftArrowIcon from '~/assets/svg/leftArrowIcon.svg';
import RightArrowIcon from '~/assets/svg/rightArrowIcon.svg';

interface CarouselButtonsProps {
    screenSize?: 'Desktop' | 'Mobile' | 'Tablet' | 'Laptop';
    onLeftClick: () => void;
    onRightClick: () => void;
    isMobile: boolean;
    isTablet: boolean;
}

export const CarouselButtons = (props: CarouselButtonsProps) => {
    const { screenSize, onLeftClick, onRightClick, isTablet, isMobile } = props;

    let transformLeft = '';
    let transformRight = '';

    if (!isMobile && !isTablet) {
        transformLeft = 'translate(-20%, 350%)';
        if (screenSize === 'Desktop') {
            transformRight = 'translate(1324px, 350%)';
        } else {
            transformRight = 'translate(842px, 350%)';
        }
    } // для корректного отображения на mobile и tablet

    return (
        <Box>
            <IconButton
                width={isMobile || isTablet ? '0' : 'max-content'}
                visibility={isMobile || isTablet ? 'hidden' : 'visible'}
                data-test-id='carousel-back'
                zIndex={3}
                aria-label='Previous'
                icon={<Image src={LeftArrowIcon} />}
                position='absolute'
                transform={transformLeft}
                onClick={onLeftClick}
            />
            <IconButton
                width={isMobile || isTablet ? '0' : 'max-content'}
                visibility={isMobile || isTablet ? 'hidden' : 'visible'}
                data-test-id='carousel-forward'
                zIndex={3}
                aria-label='Previous'
                icon={<Image src={RightArrowIcon} />}
                position='absolute'
                transform={transformRight}
                onClick={onRightClick}
            />
        </Box>
    );
};
