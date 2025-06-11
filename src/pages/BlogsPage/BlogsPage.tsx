import { Flex, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { FavoriteBlogs } from '~/components/Blogs/FavoriteBlogs/FavoriteBlogs';
import { OtherBlogs } from '~/components/Blogs/OtherBlogs/OtherBlogs';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetBloggersQuery } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';
import { NewRecipes } from '~/widgets/NewRecipes/NewRecipes';

export const BlogsPage = () => {
    const alert = useAlertToast();
    const userId = useAppSelector(userIdSelector);
    const navigate = useNavigate();

    const { isDesktop } = useScreenSize();

    const defaultLimit = isDesktop ? '9' : '8';
    const [limit, setLimit] = useState('9');

    const {
        data: BloggersData,
        refetch,
        isError,
        isFetching,
        isLoading,
        isSuccess,
    } = useGetBloggersQuery({
        currentUserId: userId,
        limit: limit,
    });

    const [otherBlogs, setOtherBlogs] = useState(BloggersData?.others);

    useEffect(() => {
        if (limit === defaultLimit) {
            setOtherBlogs(BloggersData?.others.slice(0, Number(defaultLimit)));
        } else {
            setOtherBlogs(BloggersData?.others);
        }
    }, [isDesktop, isSuccess, BloggersData?.others]);

    const favoriteBlogs = BloggersData?.favorites;

    const onChangeLimit = () => {
        if (limit === 'all') {
            setLimit('9');
            refetch();
            return;
        }
        setLimit('all');
        refetch();
        return;
    };

    if (isError) {
        alert(defaultAlert, false);
        navigate(APP_PATHS.root);
    }

    if (isLoading || isFetching) return <FullScreenSpinner />;
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
            {favoriteBlogs?.length && <FavoriteBlogs blogs={favoriteBlogs} />}

            <OtherBlogs limit={limit} onChangeLimit={onChangeLimit} blogs={otherBlogs} />
            <NewRecipes />
        </Flex>
    );
};
