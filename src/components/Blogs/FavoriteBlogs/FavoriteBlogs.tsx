import { Flex, Text } from '@chakra-ui/react';

import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { BloggerType } from '~/shared/types/bloggersTypes';

type FavoriteBlogsProps = {
    blogs: BloggerType[];
};

export const FavoriteBlogs = ({ blogs }: FavoriteBlogsProps) => {
    const blogsForRender = blogs?.map((el) => (
        <CardWithAvatar
            name={`${el.firstName} ${el.lastName}`}
            username={`@${el.login}`}
            text={el.notes[0]?.text}
            isBlogsPage
            isFavorite
            subscribers={el.subscribersCount}
            bookmarks={el.bookmarksCount}
            newRecipesCount={el.newRecipesCount}
            bloggerId={el._id}
        />
    ));

    return (
        <Flex
            width='100%'
            backgroundColor='#c4ff61'
            borderRadius='16px'
            padding={{ base: '12px', xl: '24px' }}
            gap='16px'
            flexDirection='column'
        >
            <Text
                fontWeight={{ base: '500', xl: '400' }}
                fontSize={{ base: '24px', xl: '36px' }}
                lineHeight={{ base: '133%', xl: '111%' }}
            >
                Избранные блоги
            </Text>
            <Flex width='100%' gap='16px' flexWrap='wrap'>
                {blogsForRender}
            </Flex>
        </Flex>
    );
};
