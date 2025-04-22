import { Button, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { recipeData } from '~/shared/data/recipeData';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';

import ArrowRightIcon from '../../../assets/svg/BsArrowRight.svg';

const gap = {
    Desktop: '24px',
    Laptop: '16px',
    Tablet: '12px',
    Mobile: '12px',
};

export const Juiciest = () => {
    const navigate = useNavigate();

    const onClickHandler = () => {
        navigate('/the-juiciest');
    };

    const { screenSize, isDesktop, isLaptop, isMobile, isTablet } = useScreenSize();

    const direction = isDesktop || isTablet ? 'row' : 'column';

    const mappedRecipes = [...recipeData]
        .sort((a, b) => b.likes - a.likes)
        .map((recipe, index) => {
            const onClickHandler = () => {
                navigate(`${recipe.category[0]}/${recipe.subcategory[0]}/${recipe.id}`);
            };

            return (
                <CardWithLeftImage
                    index={index}
                    bookMarks={recipe.bookmarks}
                    likes={recipe.likes}
                    onClickHandler={onClickHandler}
                    key={recipe.title}
                    size={screenSize}
                    image={recipe.image}
                    title={recipe.title}
                    description={recipe.description}
                    dishType={recipe.category[0]}
                />
            );
        })
        .slice(0, 8);

    return (
        <Flex direction='column' gap={gap[screenSize]} width='100%'>
            <Flex width='100%' justifyContent='space-between' alignItems='center'>
                <PageBlockTitle title='Самое сочное' />

                {(isDesktop || isLaptop) && (
                    <Button
                        data-test-id='juiciest-link'
                        onClick={onClickHandler}
                        backgroundColor='#b1ff2e'
                        color='#000'
                        size='md'
                        rightIcon={<Image src={ArrowRightIcon} />}
                    >
                        Вся подборка
                    </Button>
                )}
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
                position={isMobile || isTablet ? 'static' : 'absolute'}
                width={isMobile || isTablet ? '100%' : '0'}
                justifyContent='center'
                visibility={isMobile || isTablet ? 'visible' : 'hidden'}
            >
                <Button
                    data-test-id='juiciest-link-mobile'
                    onClick={onClickHandler}
                    backgroundColor='#b1ff2e'
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
