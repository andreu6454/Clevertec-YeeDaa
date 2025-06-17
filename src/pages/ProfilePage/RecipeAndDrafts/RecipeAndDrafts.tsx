import { Flex, HStack } from '@chakra-ui/react';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { NullableNewRecipesDataType } from '~/shared/types/recipeTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

type RecipeAndDraftsProps = {
    drafts: NullableNewRecipesDataType[];
    userId: string;
};

export const RecipeAndDrafts = ({ drafts, userId }: RecipeAndDraftsProps) => {
    const { data } = useGetUserRecipesByIdQuery(userId);
    const recipes = data?.recipes;

    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    if (!recipes) return null;

    const draftsCount = drafts.length;
    const recipesCount = recipes.length;

    const recipesForRender = recipes.map((el, index) => {
        const category = getCategoryById(categories, subCategories, el.categoriesIds[0]);

        return (
            <CardWithLeftImage
                index={index}
                key={el.title + index}
                recipe={el}
                categoryTitle={category?.category || ''}
            />
        );
    });

    return (
        <Flex flexDirection='column' gap='16px'>
            <HStack gap='32px'>
                <TextWithCount text='Мои рецепты' count={recipesCount} />
                <TextWithCount text='Черновики' count={draftsCount} />
            </HStack>
            <Flex gap='24px' flexWrap='wrap'>
                {recipesForRender}
            </Flex>
        </Flex>
    );
};
