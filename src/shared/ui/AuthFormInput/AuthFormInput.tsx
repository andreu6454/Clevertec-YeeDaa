import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/icons';
import { FormHelperText } from '@chakra-ui/react';
import { FieldValues, SetFieldValue, UseFormRegisterReturn } from 'react-hook-form';

type AuthFormInputProps = {
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    placeholder: string;
    setValue: SetFieldValue<FieldValues>;
    hint?: string;
    error?: string;
    dataTestId?: string;
};

export const AuthFormInput = (props: AuthFormInputProps) => {
    const { register, hint, error, label, placeholder, setValue, isInvalid, dataTestId } = props;

    const { name: fieldName } = register;

    const trimOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const trimmedValue = event.target.value.trim();

        setValue(fieldName, trimmedValue);
    };

    return (
        <FormControl
            isInvalid={isInvalid}
            maxWidth={{ base: '328px', md: '355px', lg: '451px', '2xl': '461px' }}
        >
            <FormLabel marginBottom='4px'>{label}</FormLabel>
            <Input
                data-test-id={dataTestId}
                placeholder={placeholder}
                {...register}
                size='lg'
                width='100%'
                variant='outlined'
                border={isInvalid ? '1px solid #e53e3e' : '1px solid #d7ff94'}
                border-radius='6px'
                onBlur={trimOnBlur}
            />
            <FormHelperText marginTop='4px'>{hint}</FormHelperText>
            <FormErrorMessage position='absolute'>{error}</FormErrorMessage>
        </FormControl>
    );
};
