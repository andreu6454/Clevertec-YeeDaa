import { Flex } from '@chakra-ui/react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { AvatarInput } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/AvatarInput/AvatarInput';
import { UpdateProfileInfo } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/UpdateProfileInfoBlock/UpdateProfileInfo';
import { useGetProfileQuery } from '~/query/services/users';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const AuthorizationAndPersonalisation = () => {
    const { data: ProfileData, isLoading } = useGetProfileQuery();

    if (isLoading || !ProfileData) return <FullScreenSpinner />;
    return (
        <Flex flexDirection='column' gap='16px'>
            <Typography Size={TypographySizes.xl} fontWeight={700}>
                Авторизация и персонализация
            </Typography>
            <AvatarInput avatar={ProfileData?.avatar} />
            <UpdateProfileInfo
                firstName={ProfileData?.firstName}
                lastName={ProfileData?.lastName}
                email={ProfileData?.email}
                login={ProfileData?.login}
            />
        </Flex>
    );
};
