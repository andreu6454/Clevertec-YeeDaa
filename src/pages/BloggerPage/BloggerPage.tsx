import { VStack } from '@chakra-ui/react';
import { useParams } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { BloggerInfo } from '~/pages/BloggerPage/AuthorInfo/BloggerInfo';
import { Notes } from '~/pages/BloggerPage/Notes/Notes';
import { useGetBloggerByIdQuery } from '~/query/services/bloggers';
import { useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const BloggerPage = () => {
    const { bloggerId } = useParams();
    const userId = useAppSelector(userIdSelector);
    const alert = useAlertToast();

    const getBloggerByIdParams = { bloggerId: bloggerId || '', userId: userId };

    const {
        data: bloggerData,
        isLoading,
        isError: bloggerError,
    } = useGetBloggerByIdQuery(getBloggerByIdParams, { skip: !bloggerId });

    const { data: RecipesData, isError: recipesDataError } = useGetUserRecipesByIdQuery(
        bloggerId || '',
        { skip: !bloggerId },
    );

    if (bloggerError || recipesDataError) {
        alert(defaultAlert, false);
    }
    if (isLoading) return <FullScreenSpinner />;
    if (!RecipesData || !bloggerId) return null;
    return (
        <VStack
            paddingRight={{ base: 0, xl: '64px' }}
            width='100%'
            alignItems='center'
            pt='16px'
            gap='40px'
        >
            <BloggerInfo bloggerData={bloggerData} bloggerId={bloggerId} userId={userId} />
            <RecipesContainer data={RecipesData.recipes} />
            <Notes notes={bloggerData?.bloggerInfo?.notes} />
        </VStack>
    );
};
