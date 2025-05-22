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

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type AuthPasswordInputProps = {
    register: UseFormRegisterReturn;
    isInvalid: boolean;
    label: string;
    placeholder: string;
    dataTestId: string;
    hint?: string;
    error?: string;
};

export const AuthPasswordInput = (props: AuthPasswordInputProps) => {
    const { register, hint, error, label, placeholder, dataTestId, isInvalid } = props;

    const [show, setShow] = useState(false);

    return (
        <FormControl
            isInvalid={isInvalid}
            maxWidth={{ base: '328px', md: '355px', lg: '451px', '2xl': '461px' }}
        >
            <FormLabel mb='4px'>{label}</FormLabel>
            <InputGroup size='lg' width='100%'>
                <Input
                    {...register}
                    placeholder={placeholder}
                    {...register}
                    type={show ? 'text' : 'password'}
                    size='lg'
                    data-test-id={dataTestId}
                    variant='outlined'
                    width='100%'
                    border='1px solid #d7ff94'
                    border-radius='6px'
                />
                <InputRightElement>
                    <IconButton
                        data-test-id={DATA_TEST_IDS.passwordVisibility}
                        variant='ghost'
                        onMouseDown={() => setShow(true)}
                        onMouseUp={() => setShow(false)}
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
