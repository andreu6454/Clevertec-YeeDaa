import { z } from 'zod';

const ingredientSchema = z.object({
    title: z.string().min(1, 'error'),
    count: z.number().min(1, 'error'),
    measureUnit: z.string().min(1, 'error'),
});
const stepSchema = z.object({
    stepNumber: z.number().min(0, 'error'),
    description: z.string().min(1, 'error'),
    image: z.string().optional(),
});

export const newRecipeSchema = z.object({
    title: z.string().min(1, { message: 'error' }).max(50, { message: 'error' }),
    description: z.string().min(1, { message: 'error' }).max(500, { message: 'error' }),
    categoriesIds: z.array(z.string()).min(3, { message: 'error' }),
    time: z.number().min(1, { message: 'error' }).max(10000, { message: 'error' }),
    portions: z.number().min(1, { message: 'error' }).max(10000, { message: 'error' }),

    ingredients: z.array(ingredientSchema).min(1, { message: 'error' }),
    steps: z.array(stepSchema).min(1, { message: 'error' }),
    image: z.string().min(1, { message: 'error' }),
});
