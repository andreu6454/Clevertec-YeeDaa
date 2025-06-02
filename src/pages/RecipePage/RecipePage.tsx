import { Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { RecipeAuthor } from '~/pages/RecipePage/RecipeAuthor/RecipeAuthor';
import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '~/pages/RecipePage/RecipeSteps/RecipeSteps';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle/RecipeTitle';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { setAppError } from '~/store/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';

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
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { screenSize, isMobile } = useScreenSize();

    const { recipeId } = useParams();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const { data, isLoading, isError } = useGetRecipeByIdQuery(recipeId || '', {
        skip: !recipeId,
    });

    const categoriesForRender = Array.from(
        new Set(
            data?.categoriesIds.map(
                (el) => getCategoryById(categories, subCategories, el)?.category || '',
            ),
        ),
    );

    if (isLoading) return <FullScreenSpinner />;

    if (!data) return null;
    if (isError) {
        dispatch(setAppError('error'));
        navigate(-1);
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
                subCategoryId={data?.categoriesIds[0]}
                id={recipeId || ''}
                authorId={data?.authorId}
                title={data?.title}
                description={data?.description}
                time={data.time}
                likes={data.likes}
                bookmarks={data.bookmarks}
                image={data.image}
                category={categoriesForRender}
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
