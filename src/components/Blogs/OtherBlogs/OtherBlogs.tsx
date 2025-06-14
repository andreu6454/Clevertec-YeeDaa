import { Button, Flex, Image } from '@chakra-ui/react';
import { useState } from 'react';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { BloggerType } from '~/shared/types/bloggersTypes';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

type OtherBlogsProps = {
    blogs: BloggerType[] | undefined;
    onChangeLimit: () => void;
    limit: string;
};

export const OtherBlogs = ({ blogs, onChangeLimit, limit }: OtherBlogsProps) => {
    const alert = useAlertToast();

    const userId = useAppSelector(userIdSelector);
    const { isMobile } = useScreenSize();

    const [currentBlogId, setCurrentBlogId] = useState('');
    const [toggleSubscribe, { isLoading, isError }] = useToggleSubscriptionMutation();

    const blogsForRender = blogs?.map((el) => {
        const onToggleSubscribe = () => {
            setCurrentBlogId(el._id);
            toggleSubscribe({ bloggerId: el._id, userId: userId });
        };

        return (
            <CardWithAvatar
                key={el._id + 'other_blogs'}
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
                isButtonsRow={!isMobile}
            />
        );
    });

    if (isError) {
        alert(defaultAlert, false);
        return null;
    }
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.blogsOtherBox}
            backgroundColor='rgba(0, 0, 0, 0.04)'
            borderRadius='16px'
            padding={{ base: '16px', xl: '24px' }}
            flexDirection='column'
            alignItems='center'
            gap='24px'
            width='100%'
        >
            <Flex
                data-test-id={DATA_TEST_IDS.blogsOtherGrid}
                width='100%'
                flexWrap='wrap'
                gap='16px'
            >
                {blogsForRender}
            </Flex>

            <Button
                onClick={onChangeLimit}
                leftIcon={
                    limit === 'all' ? (
                        <Image transform='rotate(180deg)' src={ArrowRightIcon} />
                    ) : undefined
                }
                rightIcon={limit === 'all' ? undefined : <Image src={ArrowRightIcon} />}
                variant='ghost'
            >
                <span data-test-id={DATA_TEST_IDS.blogsOtherButton}>
                    {limit === 'all' ? 'Свернуть' : 'Все авторы'}
                </span>
            </Button>
        </Flex>
    );
};
