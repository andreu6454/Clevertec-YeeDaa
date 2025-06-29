import { Flex } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useBookmarkRecipeMutation, useGetUserRecipesByIdQuery } from '~/query/services/recipes';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { Recipe } from '~/shared/types/recipeTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

type ProfileBookmarksProps = {
    userId: string;
};

export const ProfileBookmarks = ({ userId }: ProfileBookmarksProps) => {
    const { data, isLoading } = useGetUserRecipesByIdQuery(userId);
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const [recipes, setRecipes] = useState<Recipe[]>([]);

    const [bookmark] = useBookmarkRecipeMutation();
    const errorAlert = useAlertToast();

    const bookmarks = data?.myBookmarks || [];

    useEffect(() => {
        setRecipes(bookmarks || []);
    }, [bookmarks]);

    if (isLoading) return <FullScreenSpinner />;
    if (!data) return null;

    const bookmarksForRender = recipes?.map((el, index) => {
        const category = getCategoryById(categories, subCategories, el?.categoriesIds?.[0]);

        const onBookmarkHandle = async () => {
            const tempBookmark = el;
            if (!el._id) return;
            try {
                setRecipes(recipes.filter((recipe) => recipe._id !== el._id));
                await bookmark(el._id).unwrap();
            } catch (error) {
                setRecipes((prev) => [...prev, tempBookmark]);
                const responseError = error as ErrorResponse;
                if (responseError?.status === 500) {
                    errorAlert(NEW_RECIPE_ALERTS.serverError, false);
                }
            }
        };

        return (
            <CardWithLeftImage
                key={el.title + 'profileBookmark'}
                recipe={el}
                index={index}
                categoryTitle={category?.category || ''}
                isBookmarked
                onBookmarkHandler={onBookmarkHandle}
            />
        );
    });

    return (
        <Flex data-test-id={DATA_TEST_IDS.userProfileBookmarks} direction='column' gap='16px'>
            <TextWithCount text='Мои закладки' count={recipes?.length || 0} />
            <Flex gap='16px' flexWrap='wrap' width='100%'>
                {bookmarksForRender}
            </Flex>
        </Flex>
    );
};
