import { Flex } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { RecipeAuthor } from '~/pages/RecipePage/RecipeAuthor/RecipeAuthor';
import { RecipeCalories } from '~/pages/RecipePage/RecipeCalories/RecipeCalories';
import { RecipeIngredients } from '~/pages/RecipePage/RecipeIngredients/RecipeIngredients';
import { RecipeSteps } from '~/pages/RecipePage/RecipeSteps/RecipeSteps';
import { RecipeTitle } from '~/pages/RecipePage/RecipeTitle/RecipeTitle';
import { useGetRecipeByIdQuery } from '~/query/services/recipes';
import { useGetAllUsersQuery } from '~/query/services/users';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';

const RecipePage = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { screenSize } = useScreenSize();

    const { recipeId } = useParams();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const { data, isLoading, isError } = useGetRecipeByIdQuery(recipeId || '', {
        skip: !recipeId,
    });

    const { data: AllUsers } = useGetAllUsersQuery();
    const recipeAuthor = AllUsers?.filter((el) => el.id === data?.authorId)[0];

    const categoriesForRender = Array.from(
        new Set(
            data?.categoriesIds.map(
                (el) => getCategoryById(categories, subCategories, el)?.category || '',
            ),
        ),
    );

    if (isLoading) return <FullScreenSpinner />;

    if (!data || !recipeAuthor) return null;
    if (isError) {
        dispatch(setAppError('error'));
        navigate(-1);
    }

    return (
        <Flex
            paddingTop={{ base: '16px', xl: '56px' }}
            width='100%'
            direction='column'
            alignItems='center'
            gap={{ base: '24px', xl: '40px' }}
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
            <RecipeCalories nutritionValue={data.nutritionValue} />
            <RecipeIngredients
                portions={Number(data.portions)}
                screenSize={screenSize}
                ingredients={data.ingredients}
            />
            <RecipeSteps screenSize={screenSize} steps={data.steps} />
            <RecipeAuthor
                fullName={`${recipeAuthor?.firstName} ${recipeAuthor?.lastName}`}
                login={recipeAuthor?.login}
                avatar={recipeAuthor?.photo}
                id={recipeAuthor?.id}
            />
            <NewRecipes />
        </Flex>
    );
};

export default RecipePage;
