import { Flex } from '@chakra-ui/react';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { getCategoryById } from '~/shared/services/getCategoryById';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

type ProfileBookmarksProps = {
    userId: string;
};

export const ProfileBookmarks = ({ userId }: ProfileBookmarksProps) => {
    const { data } = useGetUserRecipesByIdQuery(userId);
    const bookmarks = data?.myBookmarks;
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const bookmarksForRender = bookmarks?.map((el, index) => {
        const category = getCategoryById(categories, subCategories, el.categoriesIds[0]);

        return (
            <CardWithLeftImage
                key={el.title + 'profileBookmark'}
                recipe={el}
                index={index}
                categoryTitle={category?.category || ''}
                isBookmarked
            />
        );
    });

    return (
        <Flex direction='column' gap='16px'>
            <TextWithCount text='Мои закладки' count={bookmarks?.length || 0} />
            <Flex gap='16px' flexWrap='wrap' width='100%'>
                {bookmarksForRender}
            </Flex>
        </Flex>
    );
};
