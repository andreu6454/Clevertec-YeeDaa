import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { AllBlogsLink } from '~/components/AllBlogsLink/AllBlogsLink';
import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { BloggerType } from '~/shared/types/bloggersTypes';

type OtherBlogsProps = {
    blogs: BloggerType[] | undefined;
};

export const OtherBlogs = ({ blogs }: OtherBlogsProps) => {
    const { isMobile } = useScreenSize();

    if (!blogs || !blogs.length) return null;

    const blogsForMap = blogs
        .slice(0, 3)
        .map((blog) => (
            <CardWithAvatar
                key={blog._id + 'otherBlogs'}
                name={`${blog.firstName} ${blog.lastName}`}
                username={blog.login}
                text={blog.notes[0]?.text}
                subscribers={blog.subscribersCount}
                bookmarks={blog.bookmarksCount}
                isFavorite={blog.isFavorite}
                isBlogsPage
                bloggerId={blog._id}
                width={!isMobile ? 'calc(33% - 16px)' : '100%'}
                isButtonsRow={false}
            />
        ));

    return (
        <VStack gap='24px' width='100%'>
            <HStack width='100%' justifyContent='space-between'>
                <Text
                    fontWeight={{ base: '600', xl: '500' }}
                    fontSize={{ base: '24px', xl: '48px' }}
                    lineHeight={{ base: '133%', xl: '100%' }}
                >
                    Другие блоги
                </Text>
                <AllBlogsLink dataTestId={DATA_TEST_IDS.bloggerUserOtherBlogsButton} />
            </HStack>
            <Flex
                data-test-id={DATA_TEST_IDS.bloggerUserOtherBlogsGrid}
                width='100%'
                gap='16px'
                flexDirection={isMobile ? 'column' : 'row'}
            >
                {blogsForMap}
            </Flex>
        </VStack>
    );
};
