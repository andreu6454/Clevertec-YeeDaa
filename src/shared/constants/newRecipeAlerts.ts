export const NEW_RECIPE_MESSAGES = {
    serverError: 'Ошибка сервера',
    error: 'Ошибка',
    draftErrorMessage: 'Не удалось сохранить черновик рецепта',
    newRecipeErrorMessage: 'Попробуйте пока сохранить в черновик.',
    sameTitleErrorMessage: 'Рецепт с таким названием уже существует',
    tryLater: 'Попробуйте немного позже',
    successMessage: 'Рецепт успешно опубликован',
    draftSuccessMessage: 'Черновик успешно сохранен',
    deleteError: 'Не удалось удалить рецепт',
    deleteSuccess: 'Рецепт успешно удален',
};

type statusType = 'error' | 'info' | 'warning' | 'success' | 'loading' | undefined;

export const NEW_RECIPE_ALERTS = {
    serverError: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.serverError,
        description: NEW_RECIPE_MESSAGES.tryLater,
    },
    recipeSuccess: {
        status: 'success' as statusType,
        title: NEW_RECIPE_MESSAGES.successMessage,
    },
    draftSuccess: {
        status: 'success' as statusType,
        title: NEW_RECIPE_MESSAGES.draftSuccessMessage,
    },
    draftServerError: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.serverError,
        description: NEW_RECIPE_MESSAGES.draftErrorMessage,
    },
    draftSameTitleError: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.error,
        description: NEW_RECIPE_MESSAGES.sameTitleErrorMessage,
    },
    recipeServerError: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.serverError,
        description: NEW_RECIPE_MESSAGES.newRecipeErrorMessage,
    },
    recipeSameTitle: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.error,
        description: NEW_RECIPE_MESSAGES.sameTitleErrorMessage,
    },
    recipeDeleteError: {
        status: 'error' as statusType,
        title: NEW_RECIPE_MESSAGES.serverError,
        description: NEW_RECIPE_MESSAGES.deleteError,
    },
    recipeDeleteSuccess: {
        status: 'success' as statusType,
        title: NEW_RECIPE_MESSAGES.deleteSuccess,
    },
};
