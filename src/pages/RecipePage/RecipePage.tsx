import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { NewRecipes } from '~/pages/MainPage/NewRecipes/NewRecipes';
import { RecipeAuthor } from '~/pages/RecipePage/RecipeAuthor/RecipeAuthor';
import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '~/pages/RecipePage/RecipeSteps/RecipeSteps';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle/RecipeTitle';
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
            <RecipeSteps steps={data.steps} />
            <RecipeAuthor />
            <NewRecipes />
        </Flex>
    );
};

export default RecipePage;
