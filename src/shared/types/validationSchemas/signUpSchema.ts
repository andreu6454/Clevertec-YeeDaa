import { z } from 'zod';

import { validationErrors } from '~/shared/constants/validationErrors';

export const emailSchema = z
    .string()
    .min(1, { message: validationErrors.emailEmpty })
    .max(50, { message: validationErrors.maxLength })
    .email({ message: validationErrors.incorrectEmail });

export const userDataSchema = z.object({
    firstName: z
        .string()
        .min(1, { message: validationErrors.firstNameEmpty })
        .regex(/^[А-Яа-яЁё]/, { message: validationErrors.firstLetterCyrillic })
        .regex(/^[А-Яа-яЁё-]+$/, { message: validationErrors.onlyCyrillic })
        .max(50, { message: validationErrors.maxLength }),
    lastName: z
        .string()
        .min(1, { message: validationErrors.lastNameEmpty })
        .regex(/^[А-Яа-яЁё]/, { message: validationErrors.firstLetterCyrillic })
        .regex(/^[А-Яа-яЁё-]+$/, { message: validationErrors.onlyCyrillic })
        .max(50, { message: validationErrors.maxLength }),
    email: emailSchema,
});

export const userPasswordSchema = z
    .object({
        login: z
            .string()
            .min(1, { message: validationErrors.loginEmpty })
            .max(50, { message: validationErrors.maxLength })
            .regex(/^[A-Za-z0-9!@#$&_+\-.:]{5,}$/, { message: validationErrors.incorrectFormat }),
        password: z
            .string()
            .min(1, { message: validationErrors.passwordEmpty })
            .max(50, { message: validationErrors.maxLength })
            .regex(/^[A-Za-z0-9!@#$&_+\-.:]{8,}$/, { message: validationErrors.incorrectFormat }),
        passwordConfirm: z.string().min(1, { message: validationErrors.passwordConfirm }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
        message: validationErrors.matchPasswords,
        path: ['passwordConfirm'],
    });

export const passwordRecoverySchema = z.object({
    email: emailSchema,
});
