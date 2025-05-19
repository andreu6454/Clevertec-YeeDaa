import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/icons';
import { FormHelperText } from '@chakra-ui/react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';

type AuthFormInputProps = {
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    placeholder: string;
    testId: string;
    setValue: SetFieldValue<FieldValues>;
    hint?: string;
    error?: string;
};

export const AuthFormInput = (props: AuthFormInputProps) => {
    const { register, hint, error, label, placeholder, testId, setValue, isInvalid } = props;

    const { name: fieldName } = register;

    const trimOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const trimmedValue = event.target.value.trim();

        setValue(fieldName, trimmedValue);
    };

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel marginBottom='4px'>{label}</FormLabel>
            <Input
                placeholder={placeholder}
                {...register}
                size='lg'
                width='100%'
                variant='outlined'
                border='1px solid #d7ff94'
                border-radius='6px'
                data-test-id={testId}
                onBlur={trimOnBlur}
            />
            <FormHelperText marginTop='4px'>{hint}</FormHelperText>
            <FormErrorMessage position='absolute'>{error}</FormErrorMessage>
        </FormControl>
    );
};
