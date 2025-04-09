import { Button, Flex } from '@chakra-ui/react';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useScreenSize } from '~/hooks/useScreenSize';

interface RecipesContainerProps {
    data: Array<{ title: string; image: string; description: string; dishType: string }>;
}

export const RecipesContainer = (props: RecipesContainerProps) => {
    const { data } = props;
    const { screenSize, isTablet, isDesktop } = useScreenSize();

    const mappedCards = data.map((el) => (
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

    const marginBottom = {
        Desktop: '40px',
        Laptop: '40px',
        Tablet: '32px',
        Mobile: '32px',
    };

    return (
        <Flex
            gap={gap[screenSize]}
            width='100%'
            wrap='wrap'
            direction='column'
            alignItems='center'
            justifyContent='center'
            marginBottom={marginBottom[screenSize]}
        >
            <Flex
                gap={gap[screenSize]}
                width='100%'
                wrap='wrap'
                direction={direction}
                alignItems='center'
                justifyContent='center'
            >
                {mappedCards}
            </Flex>

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
