import { Box } from '@chakra-ui/icons';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { Carousel } from '~/shared/ui/Carousel/Carousel';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

const width = {
    Desktop: 1360,
    Laptop: 880,
    Tablet: 728,
    Mobile: 328,
};

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetRecipesQuery({
        sortBy: 'createdAt',
        sortOrder: 'desc',
        page: 1,
        limit: 10,
    });
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    if (error) {
        dispatch(setAppError('error'));
    }

    if (!data || !data?.data) {
        return null;
    }
    const mappedRecipes = [...data.data].map((recipe) => {
        const category = getCategoryById(categories, subCategories, recipe.categoriesIds[0]);

        const onClickHandler = () => {
            navigate(
                getNavigateLinkToRecipe(
                    categories,
                    subCategories,
                    recipe.categoriesIds[0],
                    recipe._id,
                ),
            );
        };
        return (
            <CardWithImage
                onClickHandler={onClickHandler}
                key={recipe.title}
                recipe={recipe}
                categoryTitle={category?.category || ''}
            />
        );
    });

    if (isLoading) return <FullScreenSpinner />;

    return (
        <Box width={width[screenSize]} height='max-content'>
            <PageBlockTitle title='Новые рецепты' />
            <Carousel>{mappedRecipes}</Carousel>
        </Box>
    );
});
