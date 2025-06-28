import { Flex } from '@chakra-ui/react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { AboutProject } from '~/pages/ProfileSettingsPage/AboutProject/AboutProject';
import { AuthorizationAndPersonalisation } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/AuthorizationAndPersonalisation';
import { DeleteAccount } from '~/pages/ProfileSettingsPage/DeleteAccount/DeleteAccount';
import { Statistic } from '~/pages/ProfileSettingsPage/Statistic/Statistic';
import { useGetProfileQuery } from '~/query/services/users';

const ProfileSettingsPage = () => {
    const { data: ProfileData, isLoading } = useGetProfileQuery();

    if (isLoading || !ProfileData) return <FullScreenSpinner />;

    return (
        <Flex
            paddingTop={{ base: '16px', xl: '24px' }}
            flexDirection='column'
            gap='40px'
            width='100%'
        >
            <AuthorizationAndPersonalisation ProfileData={ProfileData} />
            <Statistic subscribers={ProfileData?.subscribers} />
            <AboutProject />
            <DeleteAccount />
        </Flex>
    );
};

export default ProfileSettingsPage;
