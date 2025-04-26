import { Box, Card } from '@chakra-ui/icons';
import { Avatar, Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithAvatarProps {
    avatar: string;
    name: string;
    username: string;
    text: string;
    size: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
}

const sizes = {
    Desktop: {
        width: '426px',
        height: '184px',
        paddingAvatar: '24px 24px 16px 24px',
        paddingText: '16px 24px 24px 24px',
        avatarSize: 'md',
        textNameSize: TypographySizes.lg,
        textUsernameSize: TypographySizes.sm,
        textDescriptionSize: TypographySizes.sm,
    },
    Laptop: {
        width: '266px',
        height: '160px',
        paddingAvatar: '16px 16px 8px 16px',
        paddingText: '8px 16px 16px 16px',
        avatarSize: 'md',
        textNameSize: TypographySizes.lg,
        textUsernameSize: TypographySizes.sm,
        textDescriptionSize: TypographySizes.sm,
    },
    Tablet: {
        width: '226px',
        height: '152px',
        paddingAvatar: '16px 16px 12px 16px',
        paddingText: '12px 16px 16px 16px',
        avatarSize: 'sm',
        textNameSize: TypographySizes.md,
        textUsernameSize: TypographySizes.xs,
        textDescriptionSize: TypographySizes.sm,
    },
    Mobile: {
        width: '304px',
        height: '152px',
        paddingAvatar: '16px 16px 12px 16px',
        paddingText: '12px 16px 16px 16px',
        avatarSize: 'sm',
        textNameSize: TypographySizes.md,
        textUsernameSize: TypographySizes.xs,
        textDescriptionSize: TypographySizes.sm,
    },
};

export const CardWithAvatar = memo((props: CardWithAvatarProps) => {
    const { avatar, text, username, name, size } = props;
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
        >
            <Flex alignItems='center' width='100%' padding={sizes[size].paddingAvatar} gap='12px'>
                <Avatar size={sizes[size].avatarSize} src={avatar} />
                <Box width='100%' minWidth={0}>
                    <Typography
                        Size={sizes[size].textNameSize}
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='ellipsis'
                    >
                        {name}
                    </Typography>
                    <Typography Size={sizes[size].textUsernameSize}>{username}</Typography>
                </Box>
            </Flex>
            <Box padding={sizes[size].paddingText}>
                <Typography
                    Size={sizes[size].textDescriptionSize}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    noOfLines={3}
                >
                    {text}
                </Typography>
            </Box>
        </Card>
    );
});
