import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { AuthorInfoLoader } from '~/pages/BloggerPage/AuthorInfo/AuthorInfoLoader';
import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { BloggerResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { SubscribeButton } from '~/shared/ui/SubscribeButton/SubscribeButton';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type AuthorInfoProps = {
    bloggerData: BloggerResponse | undefined;
    userId: string;
    bloggerId: string;
};

export const BloggerInfo = ({ bloggerData, bloggerId, userId }: AuthorInfoProps) => {
    const bloggerInfo = bloggerData?.bloggerInfo;
    const bloggerName = bloggerInfo?.firstName + ' ' + bloggerInfo?.lastName;

    const [toggleSubscribe, { isLoading }] = useToggleSubscriptionMutation();

    const onToggleSubscribe = () => {
        toggleSubscribe({ bloggerId: bloggerId, userId: userId });
    };

    if (!bloggerData) return null;
    return (
        <Flex
            data-test-id={DATA_TEST_IDS.bloggerUserInfoBox}
            width='100%'
            height={{ base: '228px', md: '100px', xl: '128px' }}
            alignItems='center'
            flexDirection='column'
        >
            <Flex gap='24px' flexDirection={{ base: 'column', md: 'row' }} alignItems='center'>
                <Avatar name={bloggerName} size={{ base: 'xl', xl: '2xl' }} />
                <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap='12px'>
                    <Text
                        data-test-id={DATA_TEST_IDS.bloggerUserInfoName}
                        fontWeight='700'
                        fontSize='48px'
                        lineHeight='100%'
                        textOverflow='ellipsis'
                        noOfLines={1}
                    >
                        {bloggerName}
                    </Text>
                    <Typography
                        data-test-id={DATA_TEST_IDS.bloggerUserInfoLogin}
                        Size={TypographySizes.sm}
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        {`@${bloggerInfo?.login}`}
                    </Typography>
                    <HStack justifyContent='space-between' width='100%'>
                        <SubscribeButton
                            isSubscribed={bloggerData.isFavorite}
                            onSubscribeHandler={onToggleSubscribe}
                        />
                        <Flex>
                            <ReactionCount
                                dataTestId={DATA_TEST_IDS.bloggerFollowersBookmarks}
                                size='small'
                                variant='bookmark'
                                count={bloggerData.totalBookmarks || 0}
                            />
                            <ReactionCount
                                dataTestId={DATA_TEST_IDS.bloggerFollowersCount}
                                size='small'
                                variant='people'
                                count={bloggerData.totalSubscribers || 0}
                            />
                        </Flex>
                    </HStack>
                </VStack>
            </Flex>

            {isLoading && <AuthorInfoLoader />}
        </Flex>
    );
};
