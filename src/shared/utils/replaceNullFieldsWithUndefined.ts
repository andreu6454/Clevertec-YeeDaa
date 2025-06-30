import { NewRecipeDataType } from '~/components/NewRecipeForm/NewRecipeForm';
import {
    NullableIngredientDataType,
    NullableNewRecipesDataType,
    NullableStepType,
} from '~/shared/types/recipeTypes';

export const replaceNullFieldsWithUndefined = (obj: NullableNewRecipesDataType) => {
    const newObject = {} as NewRecipeDataType;

    newObject.title = obj.title;
    obj.description === null
        ? (newObject.description = '')
        : (newObject.description = obj.description);
    obj.image === null ? (newObject.image = '') : (newObject.image = obj.image);
    newObject.time = obj.time;
    newObject.portions = obj.portions;
    newObject.categoriesIds = obj.categoriesIds;
    newObject.steps = obj.steps?.map((el: NullableStepType) => ({
        image: el.image === null ? '' : el.image,
        description: el.description === null ? '' : el.description,
        stepNumber: el.stepNumber ?? 1,
    }));

    if (obj.ingredients?.length > 1) {
        newObject.ingredients = obj.ingredients?.map((el: NullableIngredientDataType) => ({
            title: el.title === null ? '' : el.title,
            measureUnit: el.measureUnit === null ? '' : el.measureUnit,
            count: el.count ?? 1,
        }));
    } else {
        newObject.ingredients = obj.ingredients?.map((el: NullableIngredientDataType) => ({
            title: el.title === null ? '' : el.title,
            measureUnit: el.measureUnit === null ? '' : el.measureUnit,
            count: el.count ?? 1,
        }));
    }

    return newObject;
};
