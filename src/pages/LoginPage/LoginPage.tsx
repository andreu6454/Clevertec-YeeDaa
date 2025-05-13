import { Flex } from '@chakra-ui/react';

import { LoginButtonWithLink } from '~/pages/LoginPage/LoginButtonWithLink/LoginButtonWithLink';
import { LoginInputs } from '~/pages/LoginPage/LoginInputs/LoginInputs';
import { AuthLayout } from '~/shared/layouts/AuthLayout/AuthLayout';

export const LoginPage = () => (
    <AuthLayout>
        <Flex flexDirection='column' width='100%' height='468px' gap='112px'>
            <LoginInputs />
            <LoginButtonWithLink />
        </Flex>
    </AuthLayout>
);
