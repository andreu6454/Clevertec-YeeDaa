import { Card, Image, Text } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { memo, useEffect, useState } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';

import ElenaAvatar from '../../assets/images/elenaAvatar.png';
import BookmarkIcon from '../../assets/svg/bookmark.svg';

interface CardWithLeftImageProps {
    size: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile';
    image: string;
    title: string;
    description: string;
    dishType: string;
}

const sizes = {
    Desktop: {
        width: '668px',
        height: '244px',
        imgWidth: '346px',
        textWidth: '274px',
        padding: '20px 24px',
        containerWidth: '322px',
        gap: '24px',
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '140%',
    },
    Laptop: {
        width: '880px',
        height: '244px',
        imgWidth: '346px',
        textWidth: '486px',
        padding: '20px 24px',
        containerWidth: '534px',
        gap: '24px',
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '140%',
    },
    Tablet: {
        width: '356px',
        height: '128px',
        imgWidth: '158px',
        textWidth: '182px',
        padding: '8px',
        containerWidth: '198px',
        gap: '0',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '150%',
    },
    Mobile: {
        width: '328px',
        height: '128px',
        imgWidth: '158px',
        textWidth: '154px',
        padding: '8px',
        containerWidth: '170px',
        gap: '0',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '150%',
    },
};

export const CardWithLeftImage = memo((props: CardWithLeftImageProps) => {
    const { size, image, dishType, description, title } = props;

    const [isSmall, setIsSmall] = useState(size === 'Mobile' || size === 'Tablet');

    useEffect(() => {
        setIsSmall(size === 'Mobile' || size === 'Tablet');
    }, [size]);

    return (
        <Card
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            width={sizes[size].width}
            height={sizes[size].height}
            direction='row'
            flexShrink={0}
            borderRadius='8px'
        >
            <Flex
                borderLeftRadius='8px'
                width={sizes[size].imgWidth}
                height='100%'
                backgroundSize='100% 100%'
                backgroundImage={image}
                alignItems={!isSmall ? 'flex-end' : 'flex-start'}
                padding={sizes[size].padding}
            >
                {!isSmall && (
                    <CardBadge
                        size='medium'
                        type='recommendation'
                        bgColor='green'
                        avatar={ElenaAvatar}
                        name='Елена высоцкая'
                    />
                )}
                {isSmall && (
                    <CardBadge size='small' type='dishType' bgColor='yellow' dishType={dishType} />
                )}
            </Flex>
            <Flex
                direction='column'
                gap={sizes[size].gap}
                width={sizes[size].containerWidth}
                height='100%'
                padding={sizes[size].padding}
            >
                <Flex height='24px' justifyContent='space-between' alignItems='center'>
                    {!isSmall && (
                        <CardBadge
                            size='medium'
                            type='dishType'
                            bgColor='yellow'
                            dishType={dishType}
                        />
                    )}
                    <Flex>
                        <ReactionCount size='small' variant='bookmark' count={85} />
                        <ReactionCount size='small' variant='emoji' count={152} />
                    </Flex>
                </Flex>
                <Flex direction='column' width={sizes[size].textWidth} height='100px' gap='8px'>
                    <Text
                        fontWeight={sizes[size].fontWeight}
                        fontSize={sizes[size].fontSize}
                        lineHeight={sizes[size].lineHeight}
                        overflow='hidden'
                        textOverflow='ellipsis'
                        noOfLines={isSmall ? 2 : 1}
                    >
                        {title}
                    </Text>
                    {!isSmall && (
                        <Text
                            fontWeight='400'
                            fontSize='14px'
                            lineHeight='143%'
                            overflow='hidden'
                            textOverflow='ellipsis'
                            noOfLines={3}
                        >
                            {description}
                        </Text>
                    )}
                </Flex>
                <Flex justifyContent='flex-end' gap='8px'>
                    <Button
                        display='flex'
                        padding={isSmall ? '6px 0 6px 6px' : ''}
                        leftIcon={<Image src={BookmarkIcon} />}
                        size={!isSmall ? 'sm' : 'xs'}
                        variant='outline'
                        colorScheme='black'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {!isSmall && 'Сохранить'}
                    </Button>
                    <Button size={!isSmall ? 'sm' : 'xs'} backgroundColor='#000' color='#fff'>
                        Готовить
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
});
