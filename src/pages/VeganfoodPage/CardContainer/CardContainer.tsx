import { Button, Flex } from '@chakra-ui/react';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useScreenSize } from '~/hooks/useScreenSize';
import { VeganData } from '~/pages/VeganfoodPage/CardContainer/veganData';

export const CardContainer = () => {
    const { screenSize, isTablet, isDesktop } = useScreenSize();

    const mappedCards = VeganData.map((el) => (
        <CardWithLeftImage
            key={el.title}
            image={el.image}
            title={el.title}
            description={el.description}
            dishType={el.dishType}
            size={screenSize}
        />
    ));

    const direction = isDesktop || isTablet ? 'row' : 'column';
    const gap = {
        Desktop: '24px',
        Laptop: '24px',
        Tablet: '16px',
        Mobile: '16px',
    };

    return (
        <Flex
            gap={gap[screenSize]}
            width='100%'
            wrap='wrap'
            direction={direction}
            alignItems='center'
            justifyContent='center'
        >
            {mappedCards}
            <Flex>
                <Flex width='100%' justifyContent='center'>
                    <Button backgroundColor='#b1ff2e' color='#000' size='md'>
                        Загрузить еще
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
