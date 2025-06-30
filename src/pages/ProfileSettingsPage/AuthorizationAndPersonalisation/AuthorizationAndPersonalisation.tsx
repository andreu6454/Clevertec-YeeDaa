import { Flex } from '@chakra-ui/react';

import { AvatarInput } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/AvatarInput/AvatarInput';
import { UpdateProfileInfo } from '~/pages/ProfileSettingsPage/AuthorizationAndPersonalisation/UpdateProfileInfoBlock/UpdateProfileInfo';
import { ProfileType } from '~/shared/types/usersTypes';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type AuthorizationAndPersonalisationProps = {
    ProfileData: ProfileType;
};

export const AuthorizationAndPersonalisation = ({
    ProfileData,
}: AuthorizationAndPersonalisationProps) => (
    <Flex flexDirection='column' gap='16px'>
        <Typography Size={TypographySizes.xl} fontWeight={700}>
            Авторизация и персонализация
        </Typography>
        <AvatarInput avatar={ProfileData?.photoLink} />
        <UpdateProfileInfo
            firstName={ProfileData?.firstName}
            lastName={ProfileData?.lastName}
            email={ProfileData?.email}
            login={ProfileData?.login}
        />
    </Flex>
);
