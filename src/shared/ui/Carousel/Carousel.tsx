import 'swiper/swiper-bundle.css';

import { Box } from '@chakra-ui/icons';
import { memo, ReactNode, useRef } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { useScreenSize } from '~/hooks/useScreenSize';
import { CarouselButtons } from '~/shared/ui/Carousel/CarouselButtons/CarouselButtons';

interface CarouselProps {
    children: ReactNode[];
}

export const Carousel = memo((props: CarouselProps) => {
    const { children } = props;

    const { screenSize, isDesktop, isMobile, isTablet } = useScreenSize();

    const swiperRef = useRef<SwiperType | null>(null);

    const next = () => {
        swiperRef.current?.slideNext();
    };

    const prev = () => {
        swiperRef.current?.slidePrev();
    };

    const swiperSlides = children.map((el, index) => (
        <SwiperSlide
            data-test-id={`carousel-card-${index}`}
            style={{ width: 'auto' }}
            key={index + 'swiper'}
        >
            {el}
        </SwiperSlide>
    ));

    return (
        <Box>
            <CarouselButtons
                isMobile={isMobile}
                isTablet={isTablet}
                onLeftClick={prev}
                onRightClick={next}
                screenSize={screenSize}
            />
            <Swiper
                data-test-id='carousel'
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                style={isMobile ? { overflow: 'visible' } : {}}
                direction='horizontal'
                spaceBetween={isDesktop ? '24px' : '12px'}
                loop={true}
                pagination={true}
                breakpoints={{
                    320: { slidesPerView: 2.01 },
                    768: { slidesPerView: 4.3 },
                    1420: { slidesPerView: 3.085 },
                    1920: { slidesPerView: 4 },
                }}
                modules={[Navigation]}
            >
                {swiperSlides}
            </Swiper>
        </Box>
    );
});
