import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle';
import { recipeData } from '~/shared/data/recipeData';

const RecipePage = () => {
    const { recipeId } = useParams();

    const data = recipeData[Number(recipeId)];

    return (
        <Flex paddingTop='56px' width='100%' direction='column' alignItems='center' gap='40px'>
            <RecipeTitle
                title={data.title}
                description={data.description}
                time={data.time}
                likes={data.likes}
                bookmarks={data.bookmarks}
                image={data.image}
                category={data.category}
            />
            <RecipeCalories nutritionValue={data.nutritionValue} />
            <RecipeIngredients ingredients={data.ingredients} />
        </Flex>
    );
};

export default RecipePage;
