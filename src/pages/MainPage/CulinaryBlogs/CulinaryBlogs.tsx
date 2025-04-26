import { Flex, Image, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { Link as ReactRouterLink } from 'react-router';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { CardWithAvatar } from '~/components/CardWithAvatar/CardWithAvatar';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

import Avatar1 from '../../../assets/images/elenaAvatar.png';

export const CulinaryBlogs = memo(() => {
    const { isMobile, isTablet, screenSize } = useScreenSize();

    const direction = isMobile ? 'column' : 'row';

    return (
        <Flex
            borderRadius='16px'
            direction='column'
            gap='16px'
            width='100%'
            padding='24px'
            backgroundColor='#c4ff61'
        >
            <Flex width='100%' alignItems='center' justifyContent='space-between'>
                <Text fontWeight='500' fontSize='30px' lineHeight='120%'>
                    Кулинарные блоги
                </Text>

                {!(isMobile || isTablet) && (
                    <Link padding='8px 16px' as={ReactRouterLink} to='/blogs'>
                        <Flex gap='8px' alignItems='center'>
                            <Text fontWeight='600' fontSize='16px' lineHeight='150%'>
                                Все авторы
                            </Text>
                            <Image src={ArrowRightIcon} />
                        </Flex>
                    </Link>
                )}
            </Flex>
            <Flex
                alignItems='center'
                justifyContent='center'
                direction={direction}
                gap='16px'
                width='100%'
            >
                <CardWithAvatar
                    avatar={Avatar1}
                    name='Елена Высоцкая'
                    size={screenSize}
                    username='@elenapovar'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
                <CardWithAvatar
                    avatar={Avatar1}
                    name='Alex Cook'
                    size={screenSize}
                    username='@funtasticooking'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
                <CardWithAvatar
                    avatar={Avatar1}
                    name='Екатерина Константинопольская'
                    size={screenSize}
                    username='@bake_and_pie'
                    text='Как раз после праздников, когда мясные продукты еще остались, но никто их уже не хочет, время варить солянку.'
                />
            </Flex>
            {(isMobile || isTablet) && (
                <Flex width='100%' justifyContent='center'>
                    <Link padding='8px 16px' as={ReactRouterLink} to='/blogs'>
                        <Flex gap='8px' alignItems='center'>
                            <Text fontWeight='600' fontSize='16px' lineHeight='150%'>
                                Все авторы
                            </Text>
                            <Image src={ArrowRightIcon} />
                        </Flex>
                    </Link>
                </Flex>
            )}
        </Flex>
    );
});
