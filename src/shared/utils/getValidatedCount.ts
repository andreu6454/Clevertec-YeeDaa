import { FieldErrors, Ref } from 'react-hook-form';

type DirtyFields<T extends object> = Partial<
    Readonly<{
        [K in keyof T]?: boolean;
    }>
>;

export const getValidatedCount = <T extends Record<string, unknown>>(
    dirtyFields: DirtyFields<T>,
    errors: FieldErrors<T>,
): number =>
    Object.keys(dirtyFields).reduce((acc, fieldName) => {
        const key = fieldName as keyof T;
        if (
            dirtyFields[key] &&
            !(errors as Record<keyof T, { message: string; type: string; ref: Ref }>)[key]
        ) {
            return acc + 1;
        }
        return acc;
    }, 0);
