import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useBookmarkRecipeMutation } from '~/query/services/recipes';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { Recipe } from '~/shared/types/recipeTypes';
import { StatisticCount } from '~/shared/ui/StatisticCount/StatisticCount';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

type RecommendedRecipesProps = {
    recipes: Recipe[];
};
export const RecommendedRecipes = ({ recipes }: RecommendedRecipesProps) => {
    const navigate = useNavigate();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const [bookmark] = useBookmarkRecipeMutation();
    const errorAlert = useAlertToast();

    const recipesForRender =
        recipes?.map((el, index) => {
            const category = getCategoryById(categories, subCategories, el.categoriesIds[0]);

            const onClickHandler = () => {
                navigate(
                    getNavigateLinkToRecipe(categories, subCategories, el.categoriesIds[0], el._id),
                );
            };

            const onBookmarkHandler = async () => {
                if (!el._id) return;
                try {
                    await bookmark(el._id).unwrap();
                } catch (error) {
                    const responseError = error as ErrorResponse;
                    if (responseError?.status === 500) {
                        errorAlert(NEW_RECIPE_ALERTS.serverError, false);
                    }
                }
            };
            return (
                <CardWithLeftImage
                    key={el.title + 'recipeRecommendation'}
                    onClickHandler={onClickHandler}
                    index={index}
                    recipe={el}
                    categoryTitle={category?.category || ''}
                    onBookmarkHandler={onBookmarkHandler}
                />
            );
        }) || [];

    return (
        <Flex flexDirection='column' gap='16px'>
            <StatisticCount type='recommendation' count={recipes?.length || 0} />
            <Flex flexWrap='wrap' gap='16px'>
                {recipesForRender}
            </Flex>
        </Flex>
    );
};
