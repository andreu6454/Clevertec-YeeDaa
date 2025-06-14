import { Button, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { useGetRecipesQuery } from '~/query/services/recipes';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getCategoryById } from '~/shared/services/getCategoryById';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { setAppError } from '~/store/slices/app-slice';
import { categoriesSelector, subCategoriesSelector } from '~/store/slices/categories-slice';

import ArrowRightIcon from '../../../assets/svg/BsArrowRight.svg';

const gap = {
    Desktop: '24px',
    Laptop: '16px',
    Tablet: '12px',
    Mobile: '12px',
};

export const Juiciest = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { data, error, isLoading } = useGetRecipesQuery({
        sortBy: 'likes',
        sortOrder: 'desc',
        page: 1,
        limit: 8,
    });
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const onClickHandler = () => {
        navigate(APP_PATHS.theJuiciest);
    };

    const { screenSize, isDesktop, isLaptop, isTablet, isDesktopLaptop, isTabletMobile } =
        useScreenSize();
    const direction = isDesktop || isTablet ? 'row' : 'column';

    const mappedRecipes = data?.data.map((recipe, index) => {
        const category = getCategoryById(categories, subCategories, recipe.categoriesIds[0]);

        const onClickHandler = () => {
            navigate(
                getNavigateLinkToRecipe(
                    categories,
                    subCategories,
                    recipe.categoriesIds[0],
                    recipe._id,
                ),
            );
        };
        return (
            <CardWithLeftImage
                index={index}
                onClickHandler={onClickHandler}
                key={recipe.title + index}
                recipe={recipe}
                categoryTitle={category?.category || ''}
            />
        );
    });

    if (error) {
        dispatch(setAppError('error'));
    }

    if (isLoading) return <FullScreenSpinner />;
    return (
        <Flex direction='column' gap={gap[screenSize]} width='100%'>
            <Flex width='100%' justifyContent='space-between' alignItems='center'>
                <PageBlockTitle title='Самое сочное' />
                <Button
                    data-test-id='juiciest-link'
                    width={isDesktopLaptop ? '' : '0'}
                    onClick={onClickHandler}
                    backgroundColor='#b1ff2e'
                    color='#000'
                    size='md'
                    visibility={isDesktopLaptop ? 'visible' : 'hidden'}
                    rightIcon={<Image src={ArrowRightIcon} />}
                >
                    Вся подборка
                </Button>
            </Flex>
            <Flex
                alignItems='center'
                justifyContent='center'
                gap='16px'
                direction={direction}
                wrap='wrap'
            >
                {mappedRecipes}
            </Flex>
            <Flex
                position={isTabletMobile ? 'static' : 'absolute'}
                width={isTabletMobile ? '100%' : '0'}
                justifyContent='center'
                visibility={isTabletMobile ? 'visible' : 'hidden'}
            >
                <Button
                    data-test-id='juiciest-link-mobile'
                    onClick={onClickHandler}
                    backgroundColor='#b1ff2e'
                    visibility={isDesktop || isLaptop ? 'hidden' : 'visible'}
                    color='#000'
                    size='md'
                    rightIcon={<Image src={ArrowRightIcon} />}
                >
                    Вся подборка
                </Button>
            </Flex>
        </Flex>
    );
};
