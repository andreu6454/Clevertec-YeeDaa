import { IconButton } from '@chakra-ui/icons';
import { Flex, Image } from '@chakra-ui/react';
import { memo, ReactNode, useRef } from 'react';

import LeftArrowIcon from '~/assets/svg/leftArrowIcon.svg';
import RightArrowIcon from '~/assets/svg/rightArrowIcon.svg';
import { useScreenSize } from '~/hooks/useScreenSize';

interface CarouselProps {
    children?: ReactNode[];
}

export const Carousel = memo((props: CarouselProps) => {
    const { children } = props;

    const { screenSize } = useScreenSize();

    const scrollRef = useRef<HTMLDivElement>(null);

    const amount = screenSize === 'Desktop' ? 346 : 289;

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = direction === 'left' ? -amount : amount;
            scrollRef.current.scrollBy({
                left: scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <Flex
            overflow='auto'
            ref={scrollRef}
            gap='12px'
            width='100%'
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
            paddingY='4px'
        >
            {(screenSize === 'Desktop' || screenSize === 'Laptop') && (
                <IconButton
                    zIndex={3}
                    aria-label='Previous'
                    icon={<Image src={LeftArrowIcon} />}
                    position='absolute'
                    transform='translate(-20%, 350%)'
                    onClick={() => scroll('left')}
                />
            )}
            {children}
            {(screenSize === 'Desktop' || screenSize === 'Laptop') && (
                <IconButton
                    zIndex={3}
                    aria-label='Previous'
                    icon={<Image src={RightArrowIcon} />}
                    position='absolute'
                    transform={
                        screenSize === 'Desktop'
                            ? 'translate(1324px, 350%)'
                            : 'translate(842px, 350%)'
                    }
                    onClick={() => scroll('right')}
                />
            )}
        </Flex>
    );
});
