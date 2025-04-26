import { Flex } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { NewRecipes } from '~/components/NewRecipes/NewRecipes';
import { RecipeAuthor } from '~/pages/RecipePage/RecipeAuthor/RecipeAuthor';
import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '~/pages/RecipePage/RecipeSteps/RecipeSteps';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle/RecipeTitle';
import { recipeData } from '~/shared/data/recipeData';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

const paddings = {
    Desktop: '56px',
    Laptop: '56px',
    Tablet: '16px',
    Mobile: '16px',
};

const gaps = {
    Desktop: '40px',
    Laptop: '40px',
    Tablet: '24px',
    Mobile: '24px',
};

const RecipePage = () => {
    const { recipeId } = useParams();

    const data = recipeData.find((recipe) => recipe.id === recipeId);
    const { screenSize, isMobile } = useScreenSize();

    if (!data) {
        return null;
    }

    return (
        <Flex
            paddingTop={paddings[screenSize]}
            width='100%'
            direction='column'
            alignItems='center'
            gap={gaps[screenSize]}
        >
            <RecipeTitle
                screenSize={screenSize}
                title={data?.title}
                description={data?.description}
                time={data.time}
                likes={data.likes}
                bookmarks={data.bookmarks}
                image={data.image}
                category={data.category}
            />
            <RecipeCalories screenSize={screenSize} nutritionValue={data.nutritionValue} />
            <RecipeIngredients
                portions={Number(data.portions)}
                screenSize={screenSize}
                ingredients={data.ingredients}
            />
            <RecipeSteps screenSize={screenSize} steps={data.steps} />
            <RecipeAuthor isMobile={isMobile} screenSize={screenSize} />
            <NewRecipes />
        </Flex>
    );
};

export default RecipePage;
