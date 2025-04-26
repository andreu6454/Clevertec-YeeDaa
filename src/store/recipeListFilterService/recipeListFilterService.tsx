import { recipeData } from '~/shared/data/recipeData';

interface FilterCategoryOptions {
    categories: string[];
    subcategory?: string;
}

export const filterRecipesByCategory = (
    recipes: typeof recipeData,
    options: FilterCategoryOptions,
) => {
    const { categories, subcategory } = options;

    if (subcategory?.length === 0 && categories.length === 0) {
        return recipes;
    } // для поиска на MainPage по всем категориям

    return recipes.filter((recipe) => {
        const matchesCategory =
            categories.length === 0 ||
            categories.some((category) => recipe.category.includes(category));

        const matchesSubcategory = !subcategory || recipe.subcategory.includes(subcategory);

        return matchesCategory && matchesSubcategory;
    });
};

export const filterByMeat = (recipes: typeof recipeData, meatFilters: string[]) => {
    if (meatFilters.length === 0) return recipes;

    return recipes.filter((recipe) => meatFilters.some((filter) => recipe.meat.includes(filter)));
};

export const filterBySideDish = (recipes: typeof recipeData, sideDishFilters: string[]) => {
    if (sideDishFilters.length === 0) return recipes;

    return recipes.filter((recipe) =>
        sideDishFilters.some((filter) => recipe.side.includes(filter)),
    );
};

export const filterByTitle = (recipes: typeof recipeData, search: string) => {
    if (search.length === 0) return recipes;

    const searchLowerCase = search.toLowerCase();
    return recipes.filter((recipe) => recipe.title.toLowerCase().includes(searchLowerCase));
};

export interface AllergenFilter {
    title: string;
    general: string;
    ingredients: string[];
}
export const filterByAllergens = (
    recipes: typeof recipeData,
    chosenAllergens: string[],
    allergenFilters: AllergenFilter[] = [], // Делаем параметр опциональным
) => {
    if (chosenAllergens.length === 0) return recipes;

    const forbiddenFromFilters = allergenFilters
        .filter((allergen) => chosenAllergens.includes(allergen.title))
        .flatMap((allergen) => allergen.ingredients)
        .map((ing) => ing.toLowerCase());

    const allForbiddenAllergens = [
        ...forbiddenFromFilters,
        ...chosenAllergens
            .filter((allergen) => !allergenFilters.some((f) => f.title === allergen))
            .map((a) => a.toLowerCase()),
    ]; // для добавленных инпутом аллергенов

    if (allForbiddenAllergens.length === 0) return recipes;

    return recipes.filter(
        (recipe) =>
            !recipe.ingredients.some((ingredient) => {
                const ingredientTitle = ingredient.title.toLowerCase();
                return allForbiddenAllergens.some((allergen) => ingredientTitle.includes(allergen));
            }),
    );
};
