import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/icons';
import { FormHelperText } from '@chakra-ui/react';
import { FieldValues, SetFieldValue } from 'react-hook-form';

import { AuthPasswordInputProps } from '~/shared/ui/AuthPasswordInput/AuthPasswordInput';

type AuthFormInputProps = AuthPasswordInputProps & {
    setValue: SetFieldValue<FieldValues>;
};

export const AuthFormInput = (props: AuthFormInputProps) => {
    const { register, hint, error, label, placeholder, setValue, isInvalid, dataTestId, width } =
        props;

    const { name: fieldName } = register;

    const trimOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const trimmedValue = event.target.value.trim();

        setValue(fieldName, trimmedValue);
    };

    return (
        <FormControl
            isInvalid={isInvalid}
            width={width ? width : { base: '328px', md: '355px', lg: '451px', '2xl': '461px' }}
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
                color='#134b00'
                border-radius='6px'
                onBlur={trimOnBlur}
                _placeholder={{
                    color: '#134b00',
                    opacity: 1,
                }}
            />
            {hint && <FormHelperText marginTop='4px'>{hint}</FormHelperText>}
            {error && <FormErrorMessage position='absolute'>{error}</FormErrorMessage>}
        </FormControl>
    );
};
