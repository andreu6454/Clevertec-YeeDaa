import { z } from 'zod';

import { validationErrors } from '~/shared/constants/validationErrors';

import { emailSchema, firstNameSchema, lastNameSchema, passwordSchema } from './signUpSchema';

export const userProfileSchema = z.object({
    firstName: firstNameSchema,
    lastName: lastNameSchema,
    email: emailSchema,
    login: z.string(),
});

export const updatePasswordSchema = z
    .object({
        oldPassword: passwordSchema,
        password: passwordSchema,
        passwordConfirm: passwordSchema,
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: validationErrors.matchPasswords,
        path: ['passwordConfirm'],
    });
