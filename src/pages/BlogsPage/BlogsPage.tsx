import { Flex, Text } from '@chakra-ui/react';

import { FavoriteBlogs } from '~/components/Blogs/FavoriteBlogs/FavoriteBlogs';
import { OtherBlogs } from '~/components/Blogs/OtherBlogs/OtherBlogs';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { userIdSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';

export const BlogsPage = () => {
    const alert = useAlertToast();
    const userId = useAppSelector(userIdSelector);
    const { data: BloggersData, isError } = useGetBloggersQuery({
        limit: '9',
        currentUserId: userId,
    });

    const favoriteBlogs = BloggersData?.favorites;
    const otherBlogs = BloggersData?.others;

    if (isError) {
        alert(defaultAlert, false);
        return null;
    }
    if (!BloggersData) return null;

    return (
        <Flex
            flexDirection='column'
            width='100%'
            alignItems='center'
            paddingTop='16px'
            pr={{ base: 0, xl: '64px' }}
            gap='24px'
        >
            <Text
                fontWeight='700'
                fontSize={{ base: '24px', xl: '48px' }}
                lineHeight={{ base: '133%', xl: '100%' }}
            >
                Кулинарные блоги
            </Text>
            {!!favoriteBlogs?.length && <FavoriteBlogs blogs={favoriteBlogs} />}
            {!!otherBlogs?.length && <OtherBlogs blogs={otherBlogs} />}
            <NewRecipes />
        </Flex>
    );
};
