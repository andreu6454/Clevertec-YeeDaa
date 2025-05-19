import { IconButton, Input, ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react';
import { useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type AuthPasswordInputProps = {
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    placeholder: string;
    testId: string;
    hint?: string;
    error?: string;
};

export const AuthPasswordInput = (props: AuthPasswordInputProps) => {
    const { register, hint, error, label, placeholder, testId, isInvalid } = props;

    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    return (
        <FormControl isInvalid={isInvalid}>
            <FormLabel mb='4px'>{label}</FormLabel>
            <InputGroup size='lg' width='100%'>
                <Input
                    {...register}
                    placeholder={placeholder}
                    {...register}
                    type={show ? 'text' : 'password'}
                    size='lg'
                    data-test-id={testId}
                    variant='outlined'
                    width='100%'
                    border='1px solid #d7ff94'
                    border-radius='6px'
                />
                <InputRightElement>
                    <IconButton
                        variant='ghost'
                        onClick={handleClick}
                        aria-label='password'
                        icon={show ? <ViewIcon /> : <ViewOffIcon />}
                    />
                </InputRightElement>
            </InputGroup>
            <FormHelperText mt='4px'>{hint}</FormHelperText>
            <FormErrorMessage position='absolute'>{error}</FormErrorMessage>
        </FormControl>
    );
};
