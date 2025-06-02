import { useLocation, useNavigate } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { NewRecipeDataType, NewRecipeForm } from '~/components/NewRecipeForm/NewRecipeForm';
import { onSaveErrorHelper } from '~/pages/NewRecipePage/errorHelpers/onSaveErrorHelper';
import { onSubmitErrorHelper } from '~/pages/NewRecipePage/errorHelpers/onSubmitErrorHelper';
import {
    useCreateDraftMutation,
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useUpdateRecipeMutation,
} from '~/query/services/newRecipe';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/newRecipeAlerts';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { Recipe } from '~/shared/types/recipeTypes';
import { replaceEmptyStringsWithNull } from '~/shared/utils/replaceEmptyStringsWithNull';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

export type onSubmitArgsType = {
    data: NewRecipeDataType;
    recipeId: string;
    setIsRedirectBlocked: (param: boolean) => void;
    continueNavigation: () => void;
};

export type onSaveArgsType = {
    data: NewRecipeDataType;
    isValid: boolean;
    setIsRedirectBlocked: (param: boolean) => void;
};

export const NewRecipePage = () => {
    const { pathname } = useLocation();
    const isNewRecipePage = pathname === APP_PATHS.newRecipe;
    const navigate = useNavigate();
    const errorAlert = useAlertToast();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const [crateRecipe, { isSuccess: isSuccessCreateRecipe }] = useCreateRecipeMutation();
    const [createDraft, { isSuccess: isSuccessCreateDraft }] = useCreateDraftMutation();
    const [updateRecipe, { isSuccess: isSuccessUpdateRecipe }] = useUpdateRecipeMutation();
    const { isLoading } = useGetMeasureUnitsQuery();

    const isSuccess = isSuccessCreateRecipe || isSuccessCreateDraft || isSuccessUpdateRecipe;

    const onSubmit = async (args: onSubmitArgsType) => {
        const { data, recipeId, setIsRedirectBlocked, continueNavigation } = args;

        const finalData = replaceEmptyStringsWithNull(data);

        try {
            let result = {} as Recipe;
            setIsRedirectBlocked(false);

            if (isNewRecipePage) {
                result = await crateRecipe(finalData).unwrap();
            } else {
                const updateRecipeParams = { id: recipeId, recipe: finalData };
                result = await updateRecipe(updateRecipeParams).unwrap();
            }

            continueNavigation();

            errorAlert(NEW_RECIPE_ALERTS.recipeSuccess, false);

            navigate(
                getNavigateLinkToRecipe(
                    categories,
                    subCategories,
                    result.categoriesIds[0],
                    result._id,
                ),
            );
            continueNavigation();
        } catch (error) {
            setIsRedirectBlocked(true);
            const responseError = error as ErrorResponse;
            onSubmitErrorHelper(responseError, errorAlert);
        }
    };

    const onSave = async (args: onSaveArgsType) => {
        const { isValid, setIsRedirectBlocked, data } = args;

        if (!isValid) return;

        const finalData = replaceEmptyStringsWithNull(data);

        try {
            setIsRedirectBlocked(false);
            await createDraft(finalData).unwrap();
            navigate(APP_PATHS.root);

            errorAlert(NEW_RECIPE_ALERTS.draftSuccess, false);
        } catch (error) {
            setIsRedirectBlocked(true);
            const responseError = error as ErrorResponse;
            onSaveErrorHelper(responseError, errorAlert);
        }
    };

    if (isLoading) {
        return <FullScreenSpinner />;
    }
    return (
        <NewRecipeForm
            isLoading={isLoading}
            isSuccess={isSuccess}
            isNewRecipePage={isNewRecipePage}
            onSubmit={onSubmit}
            onSave={onSave}
        />
    );
};
