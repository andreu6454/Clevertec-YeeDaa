import { VStack } from '@chakra-ui/react';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { ProfileBookmarks } from '~/pages/ProfilePage/ProfileBookmarks/ProfileBookmarks';
import { ProfileNotes } from '~/pages/ProfilePage/ProfileNotes/ProfileNotes';
import { ProfileTitle } from '~/pages/ProfilePage/ProfileTitle/ProfileTitle';
import { RecipeAndDrafts } from '~/pages/ProfilePage/RecipeAndDrafts/RecipeAndDrafts';
import { useGetProfileQuery } from '~/query/services/users';

const ProfilePage = () => {
    const { data: ProfileData, isLoading } = useGetProfileQuery();

    if (isLoading || !ProfileData) return <FullScreenSpinner />;
    return (
        <VStack alignItems='flex-start' gap='40px' width='100%'>
            <VStack gap='24px' alignItems='flex-start' width='100%'>
                <ProfileTitle
                    firstName={ProfileData.firstName}
                    lastName={ProfileData.lastName}
                    login={ProfileData.login}
                />
                <RecipeAndDrafts drafts={ProfileData.drafts} userId={ProfileData._id} />
            </VStack>
            <ProfileNotes notes={ProfileData?.notes} />
            <ProfileBookmarks userId={ProfileData._id} />
        </VStack>
    );
};

export default ProfilePage;
