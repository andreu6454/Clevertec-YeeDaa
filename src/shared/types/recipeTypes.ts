export type Recipe = {
    title: string;
    description: string;
    time: string;
    image: string;
    authorId: string;
    categoriesIds: string[];
    recommendedByUserId: string[];
    steps: StepType[];
    nutritionValue: NutritionValueType;
    ingredients: IngredientType[];
    likes: number;
    views: number;
    bookmarks: number;
    createdAt: string;
    _id: string;
    meat?: string;
    garnish?: string;
    portions?: number;
};

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

export type NullableStepType = {
    stepNumber: number | null;
    description: string | null;
    image?: string | undefined | null;
};

export type NullableIngredientDataType = {
    title: string | null;
    count: number | null;
    measureUnit: string | null;
};

export type NullableNewRecipesDataType = {
    title: string;
    description: string | null;
    time: number;
    categoriesIds: string[];
    portions: number;
    image: string | null;
    steps: NullableStepType[];
    ingredients: NullableIngredientDataType[];
};

export type DraftType = {
    _id: string;
} & NullableNewRecipesDataType;
