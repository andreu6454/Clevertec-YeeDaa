import { Avatar, Badge, Flex, Image, Text } from '@chakra-ui/react';

import { getImageUrl } from '~/shared/services/getImageUrl';
import { useAppSelector } from '~/store/hooks';
import { categoriesSelector } from '~/store/slices/categories-slice';

interface DishTypeBadgeProps {
    type: 'dishType' | 'recommendation';
    bgColor: 'green' | 'yellow';
    dishType?: string;
    size: 'small' | 'medium' | 'large';
    avatar?: string;
    name?: string;
}

export const CardBadge = (props: DishTypeBadgeProps) => {
    const { bgColor, dishType, size, type, avatar, name } = props;

    const bgColors = {
        green: '#d7ff94',
        yellow: '#ffffd3',
    };

    const paddings = {
        small: '0 4px',
        medium: '0 8px',
        large: '0 8px',
    };

    const gap = {
        small: '0',
        medium: '8px',
        large: '8px',
    };

    const categories = useAppSelector(categoriesSelector);

    const dishTypes = categories.find((item) => item.category === dishType);

    if (type === 'recommendation') {
        return (
            <Badge
                flexShrink={0}
                backgroundColor={bgColors[bgColor]}
                color='secondary'
                padding={paddings[size]}
                textTransform='none'
                borderRadius='4px'
            >
                <Flex height='24px' gap='8px' alignItems='center'>
                    <Avatar width='16px' height='16px' src={avatar} />
                    <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                        {name + ' рекомендует'}
                    </Text>
                </Flex>
            </Badge>
        );
    }

    return (
        <Badge
            flexShrink={0}
            backgroundColor={bgColors[bgColor]}
            color='secondary'
            padding={paddings[size]}
            textTransform='none'
            borderRadius='4px'
            height='24px'
        >
            <Flex height='24px' gap={gap[size]} alignItems='center'>
                <Image width='16px' height='16px' src={getImageUrl(dishTypes?.icon)} alt='' />
                <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                    {dishTypes?.title}
                </Text>
            </Flex>
        </Badge>
    );
};
