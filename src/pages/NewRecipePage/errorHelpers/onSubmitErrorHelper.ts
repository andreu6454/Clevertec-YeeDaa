import { UseToastOptions } from '@chakra-ui/react';

import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_STATUSES } from '~/shared/constants/newRecipeStatutes';

export const onSubmitErrorHelper = (
    error: ErrorResponse,
    errorAlert: (options: UseToastOptions, isLeftSideToast?: boolean) => void,
) => {
    if (error?.status === 500) {
        errorAlert(
            {
                status: 'error',
                title: NEW_RECIPE_STATUSES.serverError,
                description: NEW_RECIPE_STATUSES.newRecipeErrorMessage,
            },
            false,
        );
    }
    if (error?.status === 409) {
        errorAlert(
            {
                status: 'error',
                title: NEW_RECIPE_STATUSES.error,
                description: NEW_RECIPE_STATUSES.sameTitleErrorMessage,
            },
            false,
        );
    }
};
