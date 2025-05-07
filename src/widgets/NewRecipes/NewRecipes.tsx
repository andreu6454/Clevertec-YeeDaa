import { Box } from '@chakra-ui/icons';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { CardWithImage } from '~/components/CardWithImage/CardWithImage';
import { useGetNewestRecipesQuery } from '~/query/services/recipes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById, getSubCategoryById } from '~/shared/services/getCategoryById';
import { Carousel } from '~/shared/ui/Carousel/Carousel';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

const width = {
    Desktop: 1360,
    Laptop: 880,
    Tablet: 728,
    Mobile: 328,
};

export const NewRecipes = memo(() => {
    const { screenSize } = useScreenSize();
    const navigate = useNavigate();

    const { data } = useGetNewestRecipesQuery();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    // if (isLoading) return <FullScreenSpinner />;
    if (!data) {
        return null;
    }
    const mappedRecipes = [...data.data]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .map((recipe) => {
            const category = getCategoryById(categories, subCategories, recipe.categoriesIds[0]);
            const subCategory = getSubCategoryById(subCategories, recipe.categoriesIds[0]);

            const onClickHandler = () => {
                navigate(`/${category?.category}/${subCategory?.category}/${recipe._id}`);
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

    return (
        <Box width={width[screenSize]} height='max-content'>
            <PageBlockTitle title='Новые рецепты' />
            <Carousel>{mappedRecipes}</Carousel>
        </Box>
    );
});
