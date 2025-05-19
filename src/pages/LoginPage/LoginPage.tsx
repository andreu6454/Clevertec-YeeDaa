import { Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { memo } from 'react';
import { useForm } from 'react-hook-form';

import { LoginButtonWithLink } from '~/pages/LoginPage/LoginButtonWithLink/LoginButtonWithLink';
import { LoginInputs } from '~/pages/LoginPage/LoginInputs/LoginInputs';
import { useLoginMutation } from '~/query/services/auth';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';
import { signInSchema } from '~/shared/types/validationSchemas/loginSchema';

export type LoginFormDataType = {
    login: string;
    password: string;
};

export const LoginPage = memo(() => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<LoginFormDataType>({
        mode: 'onBlur',
        resolver: zodResolver(signInSchema),
    });

    const [login] = useLoginMutation();

    const onSubmitHandler = handleSubmit((data) => {
        login(data);
    });

    return (
        <AuthLayout>
            <Flex flexDirection='column' width='100%' max-height='468px'>
                <form onSubmit={onSubmitHandler}>
                    <LoginInputs setValue={setValue} register={register} errors={errors} />
                    <LoginButtonWithLink />
                </form>
            </Flex>
        </AuthLayout>
    );
});
