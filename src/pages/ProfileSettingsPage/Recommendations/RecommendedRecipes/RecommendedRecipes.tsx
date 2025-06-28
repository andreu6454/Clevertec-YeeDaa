import { Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
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

    const recipesForRender =
        recipes?.map((el, index) => {
            const category = getCategoryById(categories, subCategories, el.categoriesIds[0]);

            const onClickHandler = () => {
                navigate(
                    getNavigateLinkToRecipe(categories, subCategories, el.categoriesIds[0], el._id),
                );
            };

            return (
                <CardWithLeftImage
                    key={el.title + 'recipeRecommendation'}
                    onClickHandler={onClickHandler}
                    index={index}
                    recipe={el}
                    categoryTitle={category?.category || ''}
                />
            );
        }) || [];

    return (
        <Flex flexDirection='column' gap='16px'>
            <StatisticCount type='recommendation' count={recipes?.length} />
            <Flex flexWrap='wrap' gap='16px'>
                {recipesForRender}
            </Flex>
        </Flex>
    );
};
