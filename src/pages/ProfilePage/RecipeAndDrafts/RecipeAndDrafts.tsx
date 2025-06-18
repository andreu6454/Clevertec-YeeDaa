import { Button, Flex, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { DraftType } from '~/shared/types/recipeTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setPageTitle } from '~/store/slices/breadcrumbs-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';
import { setRecipe } from '~/store/slices/recipe-slice';

type RecipeAndDraftsProps = {
    drafts: DraftType[];
    userId: string;
};

export const RecipeAndDrafts = ({ drafts, userId }: RecipeAndDraftsProps) => {
    const { data } = useGetUserRecipesByIdQuery(userId);
    const recipes = data?.recipes;

    const [limit, setLimit] = useState(8);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const draftsCount = drafts?.length;
    const recipesCount = recipes?.length;

    const recipesForRender =
        recipes?.map((el, index) => {
            const category = getCategoryById(categories, subCategories, el.categoriesIds[0]);

            const onClickHandler = () => {
                dispatch(setRecipe(el));
                dispatch(setPageTitle({ _id: el._id, title: el.title }));
                navigate(
                    '/edit-recipe' +
                        getNavigateLinkToRecipe(
                            categories,
                            subCategories,
                            el.categoriesIds[0],
                            el._id,
                        ),
                );
            };
            return (
                <CardWithLeftImage
                    onClickHandler={onClickHandler}
                    index={index}
                    key={el.title + 'recipe'}
                    recipe={el}
                    categoryTitle={category?.category || ''}
                    isAuthor
                />
            );
        }) || [];

    const draftsForRender = drafts?.map((el, index) => {
        const onEditHandler = () => {
            dispatch(setRecipe(el));
            dispatch(setPageTitle({ _id: el._id, title: el.title }));
            navigate('/edit-draft/' + el._id);
        };
        return (
            <CardWithLeftImage
                key={el.title + 'draft'}
                recipe={el}
                index={index}
                isDraft
                isAuthor
                onClickHandler={onEditHandler}
            />
        );
    });

    const onLoadMore = () => {
        setLimit([...draftsForRender, ...recipesForRender].length);
    };

    if (!recipes) return null;
    return (
        <Flex flexDirection='column' gap='16px' width='100%'>
            <HStack gap='32px'>
                <TextWithCount text='Мои рецепты' count={recipesCount || 0} />
                <TextWithCount text='Черновики' count={draftsCount} />
            </HStack>
            <Flex gap='16px' flexWrap='wrap'>
                {[...draftsForRender, ...recipesForRender].slice(0, limit)}
            </Flex>
            {limit === 8 && (
                <Flex width='100%' justifyContent='center'>
                    <Button
                        width='149px'
                        data-test-id='load-more-button'
                        onClick={onLoadMore}
                        backgroundColor='#b1ff2e'
                        color='#000'
                        size='md'
                    >
                        Загрузить еще
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
