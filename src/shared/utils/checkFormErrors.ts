import { FieldErrors } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';

export const checkFormErrors = (errors: FieldErrors<NewRecipeDataType>): boolean => {
    if (errors?.title) return true;
    if (errors?.description) return true;
    if (errors?.image) return true;
    if (errors?.ingredients) return true;
    if (errors?.steps) return true;
    if (errors?.categoriesIds) return true;

    return false;
};
