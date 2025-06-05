import { Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';

import { FavoriteBlogs } from '~/components/Blogs/FavoriteBlogs/FavoriteBlogs';
import { OtherBlogs } from '~/components/Blogs/OtherBlogs/OtherBlogs';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';

export const BlogsPage = () => {
    const alert = useAlertToast();
    const userId = useAppSelector(userIdSelector);

    const { isDesktop } = useScreenSize();

    const defaultLimit = isDesktop ? '9' : '8';
    const [limit, setLimit] = useState(defaultLimit);

    const {
        data: BloggersData,
        refetch,
        isError,
    } = useGetBloggersQuery({
        limit: limit,
        currentUserId: userId,
    });

    const favoriteBlogs = BloggersData?.favorites;
    const otherBlogs = BloggersData?.others;

    const onChangeLimit = () => {
        if (limit === 'all') {
            setLimit(defaultLimit);
            refetch();
            return;
        }
        setLimit('all');
        refetch();
        return;
    };

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
            {!!otherBlogs?.length && (
                <OtherBlogs limit={limit} onChangeLimit={onChangeLimit} blogs={otherBlogs} />
            )}
            <NewRecipes />
        </Flex>
    );
};
