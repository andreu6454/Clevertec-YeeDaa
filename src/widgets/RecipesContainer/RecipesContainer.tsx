import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useBookmarkRecipeMutation } from '~/query/services/recipes';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { Recipe } from '~/shared/types/recipeTypes';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

interface RecipesContainerProps {
    data: Recipe[];
    onClickHandler?: () => void;
    isLastPage?: boolean;
    isLoading?: boolean;
}

export const RecipesContainer = (props: RecipesContainerProps) => {
    const { data, onClickHandler, isLastPage, isLoading = false } = props;

    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const [bookmark] = useBookmarkRecipeMutation();
    const errorAlert = useAlertToast();

    const navigate = useNavigate();

    const mappedCards = data.map((recipe, index) => {
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

        const onBookmarkHandler = async () => {
            if (!recipe._id) return;
            try {
                await bookmark(recipe._id).unwrap();
            } catch (error) {
                const responseError = error as ErrorResponse;
                if (responseError?.status === 500) {
                    errorAlert(NEW_RECIPE_ALERTS.serverError, false);
                }
            }
        };

        return (
            <CardWithLeftImage
                index={index}
                onClickHandler={onClickHandler}
                key={recipe.title + index}
                recipe={recipe}
                categoryTitle={category?.category || ''}
                onBookmarkHandler={onBookmarkHandler}
            />
        );
    });

    return (
        <Flex
            gap={{ base: '16px', xl: '24px' }}
            width='100%'
            wrap='wrap'
            direction='column'
            alignItems='center'
            justifyContent='center'
            marginBottom={{ base: '32px', xl: '40px' }}
        >
            <Flex
                data-test-id={DATA_TEST_IDS.recipeCardList}
                gap={{ base: '16px', xl: '24px' }}
                width='100%'
                wrap='wrap'
                direction={{ base: 'column', md: 'row', xl: 'column', '2xl': 'row' }}
                alignItems='center'
                justifyContent='center'
            >
                {mappedCards}
            </Flex>

            {!isLastPage && (
                <Flex width='100%' justifyContent='center'>
                    <Button
                        width='149px'
                        data-test-id='load-more-button'
                        onClick={onClickHandler}
                        isDisabled={isLoading}
                        backgroundColor='#b1ff2e'
                        color='#000'
                        size='md'
                    >
                        {isLoading ? 'Загрузка' : 'Загрузить еще'}
                    </Button>
                </Flex>
            )}
        </Flex>
    );
};
