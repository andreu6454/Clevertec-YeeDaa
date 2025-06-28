import { Card } from '@chakra-ui/icons';
import { Avatar, Flex } from '@chakra-ui/react';

import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type SubscriberCardProps = {
    avatar: string;
    fullName: string;
    login: string;
};

export const SubscriberCard = ({ avatar, fullName, login }: SubscriberCardProps) => (
    <Card
        width={{ base: '100%', md: '49%', '2xl': '33%' }}
        border='1px solid rgba(0, 0, 0, 0.08)'
        borderRadius='8px'
        padding='16px 24px'
        flexDirection='row'
        gap='12px'
    >
        <Avatar name={fullName} src={getImageUrl(avatar)} size='md' />
        <Flex flexDirection='column'>
            <Typography
                Size={TypographySizes.lg}
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
            >
                {fullName}
            </Typography>
            <Typography
                Size={TypographySizes.sm}
                color='rgba(0, 0, 0, 0.64)'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
            >
                {`@${login}`}
            </Typography>
        </Flex>
    </Card>
);
