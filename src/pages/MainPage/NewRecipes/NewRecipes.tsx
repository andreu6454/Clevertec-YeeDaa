import { Box } from '@chakra-ui/icons';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useScreenSize } from '~/hooks/useScreenSize';
import { recipeData } from '~/shared/data/recipeData';
import { Carousel } from '~/shared/ui/Carousel/Carousel';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();
    const navigate = useNavigate();

    const mappedRecipes = [...recipeData]
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map((recipe) => {
            const onClickHandler = () => {
                navigate(`${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`);
            };

            return (
                <CardWithImage
                    bookMarks={recipe.bookmarks}
                    likes={recipe.likes}
                    onClickHandler={onClickHandler}
                    key={recipe.title}
                    size={screenSize}
                    image={recipe.image}
                    title={recipe.title}
                    description={recipe.description}
                    dishType={recipe.category[0]}
                />
            );
        });

    return (
        <Box width='100%'>
            <PageBlockTitle title='Новые рецепты' />
            <Carousel>{mappedRecipes}</Carousel>
        </Box>
    );
});
