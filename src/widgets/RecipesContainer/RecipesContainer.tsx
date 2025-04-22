import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { recipeData } from '~/shared/data/recipeData';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

interface RecipesContainerProps {
    data: typeof recipeData;
}

export const RecipesContainer = (props: RecipesContainerProps) => {
    const { data } = props;
    const { screenSize, isTablet, isDesktop } = useScreenSize();
    const navigate = useNavigate();

    const mappedCards = data.map((recipe, index) => {
        const onClickHandler = () => {
            navigate(`/${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`);
        };

        return (
            <CardWithLeftImage
                index={index}
                onClickHandler={onClickHandler}
                bookMarks={recipe.bookmarks}
                likes={recipe.likes}
                key={recipe.title}
                image={recipe.image}
                title={recipe.title}
                description={recipe.description}
                dishType={recipe.category[0]}
                size={screenSize}
            />
        );
    });

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
