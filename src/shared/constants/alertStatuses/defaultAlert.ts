import { NEW_RECIPE_MESSAGES } from '~/shared/constants/alertStatuses/newRecipeAlerts';

export type statusType = 'error' | 'info' | 'warning' | 'success' | 'loading' | undefined;

const descriptionMessages = {
    tryLater: 'Попробуйте немного позже.',
};

export const defaultAlert = {
    status: 'error' as statusType,
    title: NEW_RECIPE_MESSAGES.serverError,
    description: descriptionMessages.tryLater,
};
