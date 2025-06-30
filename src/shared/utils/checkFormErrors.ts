import { FieldErrors } from 'react-hook-form';

import { NewRecipeDataType } from '~/components/NewRecipeForm/NewRecipeForm';

export const checkFormErrors = (errors: FieldErrors<NewRecipeDataType>): boolean =>
    !!errors?.title ||
    !!errors?.description ||
    !!errors?.image ||
    !!errors?.ingredients ||
    !!errors?.steps ||
    !!errors?.categoriesIds;
