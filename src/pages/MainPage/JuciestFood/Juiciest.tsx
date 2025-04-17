import { Button, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { CardWithLeftImage } from '~/components/CardWithLeftImage/CardWithLeftImage';
import { useScreenSize } from '~/hooks/useScreenSize';
import { PageBlockTitle } from '~/shared/ui/PageBlockTitle/PageBlockTitle';

import Kneli from '../../../assets/images/kneli.png';
import Lapsha from '../../../assets/images/lapsha.png';
import TomYam from '../../../assets/images/tomyam.png';
import Vetchina from '../../../assets/images/vetchina.png';
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
        navigate('/juiciest');
    };

    const { screenSize, isDesktop, isLaptop, isMobile, isTablet } = useScreenSize();

    const direction = isDesktop || isTablet ? 'row' : 'column';

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
                <CardWithLeftImage
                    image={Kneli}
                    size={screenSize}
                    title='Кнели со спагетти'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='second-dish'
                />
                <CardWithLeftImage
                    image={Vetchina}
                    size={screenSize}
                    title='Пряная ветчина по итальянски'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='second-dish'
                />
                <CardWithLeftImage
                    image={Lapsha}
                    size={screenSize}
                    title='Лапша с курицей и шафраном'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='second-dish'
                />
                <CardWithLeftImage
                    image={TomYam}
                    size={screenSize}
                    title='Том-ям с капустой кимчи'
                    description='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                    dishType='national'
                />
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
