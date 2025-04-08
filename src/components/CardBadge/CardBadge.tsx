import { Avatar, Badge, Flex, Image, Text } from '@chakra-ui/react';

import { NavBarData } from '~/shared/data/navBarData';

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
    const dishTypes = NavBarData.filter((item) => item.title === dishType);

    if (type === 'recommendation') {
        return (
            <Badge
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
            backgroundColor={bgColors[bgColor]}
            color='secondary'
            padding={paddings[size]}
            textTransform='none'
            borderRadius='4px'
        >
            <Flex height='24px' gap={gap[size]} alignItems='center'>
                <Image width='16px' height='16px' src={dishTypes[0].icon} alt='' />
                <Text fontWeight='400' fontSize='14px' lineHeight='143%'>
                    {dishTypes[0].title}
                </Text>
            </Flex>
        </Badge>
    );
};
