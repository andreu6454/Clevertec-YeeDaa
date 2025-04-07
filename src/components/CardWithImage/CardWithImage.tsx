import { Box, Card, Text } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CardBadge } from '~/components/CardBadge/CardBadge';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';

import AlexAvatar from '../../assets/images/alexAvatar.png';

interface CardWithImageProps {
    title: string;
    image: string;
    dishType: string;
    size: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
    description: string;
}

export const CardWithImage = memo((props: CardWithImageProps) => {
    const { title, image, dishType, size, description } = props;

    const sizes = {
        Mobile: {
            width: '158px',
            height: '220px',
            imgHeight: '128px',
            padding: '8px',
            pdImage: '8px',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '150%',
            textWidth: '142px',
            textHeight: '48px',
        },
        Tablet: {
            width: '158px',
            height: '220px',
            imgHeight: '128px',
            padding: '8px',
            pdImage: '8px',
            fontWeight: '500',
            fontSize: '16px',
            lineHeight: '150%',
            textWidth: '142px',
            textHeight: '48px',
        },
        Laptop: {
            width: '277px',
            height: '402px',
            imgHeight: '230px',
            padding: '12px',
            pdImage: '20px 24px',
            fontWeight: '500',
            fontSize: '20px',
            lineHeight: '140%',
            textWidth: '253px',
            textHeight: '100px',
        },
        Desktop: {
            width: '322px',
            height: '414px',
            imgHeight: '230px',
            padding: '12px',
            pdImage: '20px 24px',
            fontWeight: '500',
            fontSize: '20px',
            lineHeight: '140%',
            textWidth: '274px',
            textHeight: '100px',
        },
    };

    return (
        <Card
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            width={sizes[size].width}
            height={sizes[size].height}
            borderRadius='8px'
        >
            <Box
                borderTopRadius='8px'
                width='100%'
                height={sizes[size].imgHeight}
                backgroundSize='100% 100%'
                backgroundImage={image}
                padding={sizes[size].pdImage}
            >
                {(size === 'Tablet' || size === 'Mobile') && (
                    <CardBadge type='dishType' size='small' bgColor='green' dishType={dishType} />
                )}
                {(size === 'Desktop' || size === 'Laptop') && (
                    <CardBadge
                        type='recommendation'
                        size='small'
                        bgColor='green'
                        avatar={AlexAvatar}
                        name='Alex Cook'
                    />
                )}
            </Box>
            <Box padding={sizes[size].padding}>
                <Box
                    width={sizes[size].textWidth}
                    height={sizes[size].textHeight}
                    marginBottom='24px'
                >
                    <Text
                        fontWeight={sizes[size].fontWeight}
                        fontSize={sizes[size].fontSize}
                        lineHeight={sizes[size].lineHeight}
                        overflowWrap='break-word'
                    >
                        {title}
                    </Text>
                    {(size === 'Desktop' || size === 'Laptop') && (
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
                </Box>

                <Flex justifyContent='space-between' alignItems='center'>
                    {(size === 'Desktop' || size === 'Laptop') && (
                        <CardBadge
                            type='dishType'
                            size='medium'
                            bgColor='green'
                            dishType={dishType}
                        />
                    )}
                    <Flex width='max-content'>
                        <ReactionCount size='small' count={15} variant='bookmark' />
                        <ReactionCount size='small' count={5} variant='emoji' />
                    </Flex>
                </Flex>
            </Box>
        </Card>
    );
});
