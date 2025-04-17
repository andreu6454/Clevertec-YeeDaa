import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle';

const RecipePage = () => {
    const { recipeId } = useParams();

    return (
        <Flex paddingTop='56px' width='100%' direction='column' alignItems='center' gap='40px'>
            <RecipeTitle id={Number(recipeId)} />
            <RecipeCalories id={Number(recipeId)} />
            <RecipeIngredients id={Number(recipeId)} />
        </Flex>
    );
};

export default RecipePage;
