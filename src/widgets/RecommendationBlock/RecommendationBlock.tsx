import { Flex, Text } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { CardWithIcon } from '~/components/CardWithIcon/CardWithIcon';
import { CardWithoutImage } from '~/components/CardWithoutImage/CardWithoutImage';
import { useGetRecipeByCategoryQuery } from '~/query/services/recipes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { CategoryType } from '~/shared/types/categoryTypes';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

export const RecommendationBlock = memo(() => {
    const { isLaptop } = useScreenSize();

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [randomCategory, setRandomCategory] = useState<{
        id: string;
        category: CategoryType;
    } | null>(null);

    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    useEffect(() => {
        if (subCategories.length > 0) {
            const randomSubCategory =
                subCategories[Math.floor(Math.random() * subCategories.length)];
            const foundCategory = getCategoryById(categories, subCategories, randomSubCategory._id);

            setRandomCategory({
                id: randomSubCategory._id,
                category: foundCategory as CategoryType,
            });
        }
    }, [categories, subCategories]);

    const { data, error } = useGetRecipeByCategoryQuery(
        { subcategoryId: randomCategory?.id || '', limit: 5 },
        {
            skip: !randomCategory?.id,
        },
    );

    const recipes = data?.data;

    const length = recipes?.length || 0;

    if (error) {
        dispatch(setAppError('error'));
    }

    if (!recipes) return null;
    return (
        <Flex
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            width='100%'
            direction='column'
            gap={{ base: '16px', xl: '24px' }}
            paddingTop='24px'
        >
            <Flex
                gap={{ base: '12px', xl: '' }}
                width='100%'
                justifyContent='space-between'
                direction={{ base: 'column', xl: 'row' }}
            >
                <Text
                    width={isLaptop ? '270px' : ''}
                    fontWeight='500'
                    fontSize={{ base: '24px', xl: '48px' }}
                    lineHeight={{ base: '133', xl: '100%' }}
                    whiteSpace='pre-line'
                >
                    {randomCategory?.category.title}
                </Text>
                <Text
                    width={{ base: '100%', xl: '578px', '2xl': '668px' }}
                    fontWeight='500'
                    fontSize={{ base: '14px', xl: '16px' }}
                    lineHeight={{ base: '143', xl: '150%' }}
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {randomCategory?.category.description}
                </Text>
            </Flex>
            <Flex gap='16px' direction={{ base: 'column', md: 'row' }} alignItems='center'>
                {length > 0 && (
                    <CardWithoutImage
                        onClick={() => {
                            navigate(
                                getNavigateLinkToRecipe(
                                    categories,
                                    subCategories,
                                    recipes[0].categoriesIds[0],
                                    recipes[0]._id,
                                ),
                            );
                        }}
                        title={recipes[0].title}
                        description={recipes[0].description}
                        dishType={
                            getCategoryById(categories, subCategories, recipes[0].categoriesIds[0])
                                ?.category || ''
                        }
                    />
                )}
                {length > 1 && (
                    <CardWithoutImage
                        onClick={() => {
                            navigate(
                                getNavigateLinkToRecipe(
                                    categories,
                                    subCategories,
                                    recipes[0].categoriesIds[1],
                                    recipes[1]._id,
                                ),
                            );
                        }}
                        title={recipes[1].title}
                        description={recipes[1].description}
                        dishType={
                            getCategoryById(categories, subCategories, recipes[1].categoriesIds[0])
                                ?.category || ''
                        }
                    />
                )}
                <Flex gap='12px' justifyContent='space-between' direction='column'>
                    {length > 2 && (
                        <CardWithIcon
                            onClick={() => {
                                navigate(
                                    getNavigateLinkToRecipe(
                                        categories,
                                        subCategories,
                                        recipes[2].categoriesIds[0],
                                        recipes[2]._id,
                                    ),
                                );
                            }}
                            icon={
                                getImageUrl(
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[2].categoriesIds[0],
                                    )?.icon,
                                ) || ''
                            }
                            title={recipes[2].title}
                        />
                    )}
                    {length > 3 && (
                        <CardWithIcon
                            onClick={() => {
                                navigate(
                                    getNavigateLinkToRecipe(
                                        categories,
                                        subCategories,
                                        recipes[3].categoriesIds[0],
                                        recipes[3]._id,
                                    ),
                                );
                            }}
                            icon={
                                getImageUrl(
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[3].categoriesIds[0],
                                    )?.icon,
                                ) || ''
                            }
                            title={recipes[3].title}
                        />
                    )}
                    {length > 4 && (
                        <CardWithIcon
                            onClick={() => {
                                navigate(
                                    getNavigateLinkToRecipe(
                                        categories,
                                        subCategories,
                                        recipes[4].categoriesIds[0],
                                        recipes[4]._id,
                                    ),
                                );
                            }}
                            icon={
                                getImageUrl(
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[4].categoriesIds[0],
                                    )?.icon,
                                ) || ''
                            }
                            title={recipes[4].title}
                        />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
});
