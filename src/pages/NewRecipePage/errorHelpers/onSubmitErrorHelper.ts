import { UseToastOptions } from '@chakra-ui/react';

import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';

export const onSubmitErrorHelper = (
    error: ErrorResponse,
    errorAlert: (options: UseToastOptions, isLeftSideToast?: boolean) => void,
) => {
    if (error?.status === 500) {
        errorAlert(NEW_RECIPE_ALERTS.recipeServerError, false);
    }
    if (error?.status === 409) {
        errorAlert(NEW_RECIPE_ALERTS.recipeSameTitle, false);
    }
};
