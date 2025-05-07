import { Flex, Text } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { CardWithIcon } from '~/components/CardWithIcon/CardWithIcon';
import { CardWithoutImage } from '~/components/CardWithoutImage/CardWithoutImage';
import { useGetRecipeByCategoryQuery } from '~/query/services/recipes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { CategoryType } from '~/shared/types/categoryTypes';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';

const sizes = {
    Desktop: {
        width: '668px',
        gap: '24px',
        fTitleSize: '48px',
        lTitleHeight: '100%',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Laptop: {
        width: '578px',
        gap: '24px',
        fTitleSize: '48px',
        lTitleHeight: '100%',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Tablet: {
        width: '100%',
        gap: '16px',
        fTitleSize: '24px',
        lTitleHeight: '133%',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
    Mobile: {
        width: '100%',
        gap: '16px',
        fTitleSize: '24px',
        lTitleHeight: '133%',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
};

export const RecommendationBlock = memo(() => {
    const { screenSize, isLaptop } = useScreenSize();
    const direction = screenSize === 'Mobile' || screenSize === 'Tablet' ? 'column' : 'row';
    const navigate = useNavigate();

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
    }, [categories, subCategories]); // Добавляем зависимости

    const { data } = useGetRecipeByCategoryQuery(
        { subcategoryId: randomCategory?.id || '', limit: 5 },
        {
            skip: !randomCategory?.id,
        },
    );

    const recipes = data?.data;

    const length = recipes?.length || 0;

    // if (isLoading) return <FullScreenSpinner />;

    if (!recipes) return null;
    return (
        <Flex
            borderTop='1px solid rgba(0, 0, 0, 0.08)'
            width='100%'
            direction='column'
            gap={sizes[screenSize].gap}
            paddingTop='24px'
        >
            <Flex
                gap={screenSize === 'Mobile' || screenSize === 'Tablet' ? '12px' : ''}
                width='100%'
                justifyContent='space-between'
                direction={direction}
            >
                <Text
                    width={isLaptop ? '270px' : ''}
                    fontWeight='500'
                    fontSize={sizes[screenSize].fTitleSize}
                    lineHeight={sizes[screenSize].lTitleHeight}
                    whiteSpace='pre-line'
                >
                    {randomCategory?.category.title}
                </Text>
                <Text
                    width={sizes[screenSize].width}
                    fontWeight='500'
                    fontSize={sizes[screenSize].fDescSize}
                    lineHeight={sizes[screenSize].lDescHeight}
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {randomCategory?.category.description}
                </Text>
            </Flex>
            <Flex
                gap='16px'
                direction={screenSize === 'Mobile' ? 'column' : 'row'}
                alignItems='center'
            >
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
                        size={screenSize}
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
                        size={screenSize}
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
                            size={screenSize}
                            icon={
                                'https://training-api.clevertec.ru' +
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[2].categoriesIds[0],
                                    )?.icon || ''
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
                            size={screenSize}
                            icon={
                                'https://training-api.clevertec.ru' +
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[3].categoriesIds[0],
                                    )?.icon || ''
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
                            size={screenSize}
                            icon={
                                'https://training-api.clevertec.ru' +
                                    getCategoryById(
                                        categories,
                                        subCategories,
                                        recipes[4].categoriesIds[0],
                                    )?.icon || ''
                            }
                            title={recipes[4].title}
                        />
                    )}
                </Flex>
            </Flex>
        </Flex>
    );
});
