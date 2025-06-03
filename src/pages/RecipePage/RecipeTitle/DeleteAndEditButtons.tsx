import { DeleteIcon, IconButton, Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import SaveNotes from '~/assets/svg/saveNote.svg';
import { useDeleteRecipeMutation } from '~/query/services/newRecipe';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

type DeleteAndEditButtonsProps = {
    recipeId: string;
    subCategoryId: string;
};

export const DeleteAndEditButtons = ({ recipeId, subCategoryId }: DeleteAndEditButtonsProps) => {
    const [deleteRecipe] = useDeleteRecipeMutation();

    const alert = useAlertToast();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);
    const navigate = useNavigate();

    const onDeleteHandler = async () => {
        try {
            await deleteRecipe(recipeId).unwrap();
            alert(NEW_RECIPE_ALERTS.recipeDeleteSuccess, false);
            navigate(APP_PATHS.root);
        } catch (error) {
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                alert(NEW_RECIPE_ALERTS.recipeDeleteError, false);
            }
        }
    };

    const onEditHandler = () => {
        navigate(
            '/edit-recipe' +
                getNavigateLinkToRecipe(categories, subCategories, subCategoryId, recipeId),
        );
    };

    return (
        <Flex gap='16px'>
            <IconButton
                data-test-id={DATA_TEST_IDS.recipeDeleteButton}
                onClick={onDeleteHandler}
                aria-label='удалить рецепт'
                variant='ghost'
                icon={<DeleteIcon />}
                size='lg'
            />
            <Button
                onClick={onEditHandler}
                size='lg'
                variant='outline'
                colorScheme='black'
                leftIcon={<Image src={SaveNotes} />}
            >
                Редактировать рецепт
            </Button>
        </Flex>
    );
};
