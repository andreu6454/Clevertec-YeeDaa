import { Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { BloggerType } from '~/shared/types/bloggersTypes';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
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

        console.log(el);
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
                bloggerId={el._id}
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
            flexDirection='column'
            alignItems='center'
            gap='24px'
        >
            <Flex width='100%' flexWrap='wrap' gap='16px'>
                {blogsForRender}
            </Flex>

            <Flex gap='8px' alignItems='center'>
                <Typography Size={TypographySizes.md} fontWeight='600'>
                    Все авторы
                </Typography>
                <Image src={ArrowRightIcon} />
            </Flex>
        </Flex>
    );
};
