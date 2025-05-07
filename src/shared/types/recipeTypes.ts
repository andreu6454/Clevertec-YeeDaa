export interface Recipe {
    title: string;
    description: string;
    time: string;
    image: string;
    meat?: string;
    garnish?: string;
    portions?: number;
    authorId: string;
    categoriesIds: string[];
    steps: StepType[];
    nutritionValue: NutritionValueType;
    ingredients: IngredientType[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
}

export type StepType = {
    stepNumber: number;
    description: string;
    image: string;
};

export type NutritionValueType = {
    calories: number;
    protein: number;
    fats: number;
    carbohydrates: number;
};

export type IngredientType = {
    title: string;
    count: number;
    measureUnit: string;
};
