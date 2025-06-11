import { VStack } from '@chakra-ui/react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { BloggerInfo } from '~/pages/BloggerPage/AuthorInfo/BloggerInfo';
import { Notes } from '~/pages/BloggerPage/Notes/Notes';
import { OtherBlogs } from '~/pages/BloggerPage/OtherBlogs/OtherBlogs';
import { useGetBloggerByIdQuery, useGetBloggersQuery } from '~/query/services/bloggers';
import { useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { Recipe } from '~/shared/types/recipeTypes';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';
import { RecipesContainer } from '~/widgets/RecipesContainer/RecipesContainer';

export const BloggerPage = () => {
    const { bloggerId } = useParams();
    const userId = useAppSelector(userIdSelector);
    const alert = useAlertToast();
    const navigate = useNavigate();

    const getBloggerByIdParams = { bloggerId: bloggerId || '', userId: userId };

    const {
        data: bloggerData,
        isLoading,
        isError: isBloggerError,
        error: bloggerError,
    } = useGetBloggerByIdQuery(getBloggerByIdParams, { skip: !bloggerId });

    const {
        data: RecipesData,
        isError: recipesDataError,
        isLoading: isRecipesDataLoading,
        error: recipeError,
    } = useGetUserRecipesByIdQuery(bloggerId || '', { skip: !bloggerId });

    const { data: OtherBlogsData } = useGetBloggersQuery({
        currentUserId: userId,
        limit: '',
    });

    const [isRecipesCollapsed, setIsRecipesCollapsed] = useState(true);
    const [recipesData, setRecipesData] = useState<Recipe[]>(
        RecipesData?.recipes.slice(0, 8) || [],
    );

    useEffect(() => {
        if (RecipesData) {
            setRecipesData(RecipesData?.recipes.slice(0, 8) || []);
        }
    }, [RecipesData?.recipes]);

    const onClickHandler = () => {
        if (isRecipesCollapsed) {
            setRecipesData(RecipesData?.recipes || []);
            setIsRecipesCollapsed(false);
            return;
        }
        setRecipesData(RecipesData?.recipes.slice(0, 8) || []);
        setIsRecipesCollapsed(true);
        return;
    };

    if ((isBloggerError && bloggerError) || (recipesDataError && recipeError)) {
        const fetchError =
            (bloggerError as FetchBaseQueryError) || (recipeError as FetchBaseQueryError);
        alert(defaultAlert, false);
        if (fetchError?.status === 404) {
            navigate(APP_PATHS.notFound);
            return;
        }
        navigate(APP_PATHS.root);
    }

    if (isLoading || isRecipesDataLoading) return <FullScreenSpinner />;
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
            <RecipesContainer data={recipesData} onClickHandler={onClickHandler} />
            <Notes notes={bloggerData?.bloggerInfo?.notes} />
            <OtherBlogs blogs={OtherBlogsData?.others} />
        </VStack>
    );
};
