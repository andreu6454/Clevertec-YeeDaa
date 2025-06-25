import { Flex } from '@chakra-ui/react';

import { AboutProject } from '~/pages/ProfileSettingsPage/AboutProject/AboutProject';
import { AuthorizationAndPersonalisation } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/AuthorizationAndPersonalisation';
import { DeleteAccount } from '~/pages/ProfileSettingsPage/DeleteAccount/DeleteAccount';

const ProfileSettingsPage = () => (
    <Flex paddingTop={{ base: '16px', xl: '24px' }} flexDirection='column' gap='40px'>
        <AuthorizationAndPersonalisation />
        <AboutProject />
        <DeleteAccount />
    </Flex>
);

export default ProfileSettingsPage;
