import { Flex } from '@chakra-ui/react';
import { useState } from 'react';

import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { BloggerType } from '~/shared/types/bloggersTypes';
import { userIdSelector } from '~/store/app-slice';
import { useAppSelector } from '~/store/hooks';

type OtherBlogsProps = {
    blogs: BloggerType[];
};

export const OtherBlogs = ({ blogs }: OtherBlogsProps) => {
    const alert = useAlertToast();

    const userId = useAppSelector(userIdSelector);

    const [currentBlogId, setCurrentBlogId] = useState('');
    const [toggleSubscribe, { isLoading, isError }] = useToggleSubscriptionMutation();

    const blogsForRender = blogs?.map((el) => {
        const onToggleSubscribe = () => {
            setCurrentBlogId(el._id);
            toggleSubscribe({ bloggerId: el._id, userId: userId });
        };

        return (
            <CardWithAvatar
                name={`${el.firstName} ${el.lastName}`}
                username={`@${el.login}`}
                text={el.notes[0]?.text}
                isBlogsPage
                subscribers={el.subscribersCount}
                bookmarks={el.bookmarksCount}
                newRecipesCount={el.newRecipesCount}
                isLoading={isLoading && currentBlogId === el._id}
                onSubscribeHandler={onToggleSubscribe}
            />
        );
    });

    if (isError) {
        alert(defaultAlert, false);
        return null;
    }
    return (
        <Flex
            backgroundColor='rgba(0, 0, 0, 0.04)'
            borderRadius='16px'
            padding={{ base: '16px', xl: '24px' }}
            flexWrap='wrap'
            gap='16px'
        >
            {blogsForRender}
        </Flex>
    );
};
