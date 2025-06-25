import { z } from 'zod';

import { validationErrors } from '~/shared/constants/validationErrors';

export const loginSchema = z
    .string()
    .min(1, { message: validationErrors.loginEmpty })
    .max(50, { message: validationErrors.maxLength })
    .regex(/^[A-Za-z0-9!@#$&_+\-.:]{5,}$/, { message: validationErrors.incorrectFormat });

export const passwordSchema = z
    .string()
    .min(1, { message: validationErrors.passwordEmpty })
    .max(50, { message: validationErrors.maxLength })
    .regex(/[A-Z]/, { message: validationErrors.capitalLetter })
    .regex(/[0-9]/, { message: validationErrors.includeNumbers });

export const signInSchema = z.object({
    login: loginSchema,
    password: passwordSchema,
});

export type SignInValidationSchema = z.infer<typeof signInSchema>;

export type SignInSchema = z.infer<typeof signInSchema>;
