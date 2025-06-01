import { IngredientDataType } from '~/components/NewRecipeForm/Ingredients/Ingredients';
import { NewRecipeDataType } from '~/components/NewRecipeForm/NewRecipeForm';
import { StepType } from '~/components/NewRecipeForm/Steps/Steps';
import { NullableNewRecipesDataType } from '~/shared/types/recipeTypes';

export const replaceEmptyStringsWithNull = (obj: NewRecipeDataType) => {
    const newObject = {} as NullableNewRecipesDataType;

    newObject.title = obj.title;
    obj.description === ''
        ? (newObject.description = null)
        : (newObject.description = obj.description);
    obj.image === '' ? (newObject.image = null) : (newObject.image = obj.image);
    newObject.time = obj.time;
    newObject.portions = obj.portions;
    newObject.categoriesIds = obj.categoriesIds;
    newObject.steps = obj.steps.map((el: StepType) => ({
        image: el.image === '' ? null : el.image,
        description: el.description === '' ? null : el.description,
        stepNumber: el.stepNumber,
    }));

    if (obj.ingredients.length > 1) {
        newObject.ingredients = obj.ingredients.map((el: IngredientDataType) => ({
            title: el.title === '' ? null : el.title,
            measureUnit: el.measureUnit === '' ? null : el.measureUnit,
            count: el.count ? el.count : 1,
        }));
    } else {
        newObject.ingredients = obj.ingredients.map((el: IngredientDataType) => ({
            title: el.title === '' ? null : el.title,
            measureUnit: el.measureUnit === '' ? null : el.measureUnit,
            count: el.count ? el.count : 1,
        }));
    }

    return newObject;
};
