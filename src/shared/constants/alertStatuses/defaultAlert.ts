import { NEW_RECIPE_MESSAGES } from '~/shared/constants/alertStatuses/newRecipeAlerts';

export type statusType = 'error' | 'info' | 'warning' | 'success' | 'loading' | undefined;
export const ALERT_STATUSES = {
    error: 'error' as statusType,
    success: 'success' as statusType,
};

const descriptionMessages = {
    tryLater: 'Попробуйте немного позже.',
};

export const defaultAlert = {
    status: ALERT_STATUSES.error,
    title: NEW_RECIPE_MESSAGES.serverError,
    description: descriptionMessages.tryLater,
};
