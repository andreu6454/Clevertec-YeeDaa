import { Box, Card } from '@chakra-ui/icons';
import { Avatar, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

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
        fNameWeight: '500',
        fNameSize: '18px',
        lNameHeight: '156%',
        fUserNameWeight: '400',
        fUserNameSize: '14px',
        lUserNameHeight: '143%',
        fTextNameWeight: '400',
        fTextNameSize: '14px',
        lTextNameHeight: '143%',
    },
    Laptop: {
        width: '266px',
        height: '160px',
        paddingAvatar: '16px 16px 8px 16px',
        paddingText: '8px 16px 16px 16px',
        avatarSize: 'md',
        fNameWeight: '500',
        fNameSize: '18px',
        lNameHeight: '156%',
        fUserNameWeight: '400',
        fUserNameSize: '14px',
        lUserNameHeight: '143%',
        fTextNameWeight: '400',
        fTextNameSize: '14px',
        lTextNameHeight: '143%',
    },
    Tablet: {
        width: '226px',
        height: '152px',
        paddingAvatar: '16px 16px 12px 16px',
        paddingText: '12px 16px 16px 16px',
        avatarSize: 'sm',
        fNameWeight: '500',
        fNameSize: '16px',
        lNameHeight: '150%',
        fUserNameWeight: '400',
        fUserNameSize: '12px',
        lUserNameHeight: '133%',
        fTextNameWeight: '400',
        fTextNameSize: '14px',
        lTextNameHeight: '143%',
    },
    Mobile: {
        width: '304px',
        height: '152px',
        paddingAvatar: '16px 16px 12px 16px',
        paddingText: '12px 16px 16px 16px',
        avatarSize: 'sm',
        fNameWeight: '500',
        fNameSize: '16px',
        lNameHeight: '150%',
        fUserNameWeight: '400',
        fUserNameSize: '12px',
        lUserNameHeight: '133%',
        fTextNameWeight: '400',
        fTextNameSize: '14px',
        lTextNameHeight: '133%',
    },
};

export const CardWithAvatar = memo((props: CardWithAvatarProps) => {
    const { avatar, text, username, name, size } = props;
    return (
        <Card flexShrink={0} width={sizes[size].width} height={sizes[size].height}>
            <Flex alignItems='center' width='100%' padding={sizes[size].paddingAvatar} gap='12px'>
                <Avatar size={sizes[size].avatarSize} src={avatar} />
                <Box width='100%' minWidth={0}>
                    <Text
                        fontWeight={sizes[size].fNameWeight}
                        fontSize={sizes[size].fNameSize}
                        lineHeight={sizes[size].lNameHeight}
                        whiteSpace='nowrap'
                        overflow='hidden'
                        textOverflow='ellipsis'
                    >
                        {name}
                    </Text>
                    <Text
                        fontWeight={sizes[size].fUserNameWeight}
                        fontSize={sizes[size].fUserNameSize}
                        lineHeight={sizes[size].lUserNameHeight}
                    >
                        {username}
                    </Text>
                </Box>
            </Flex>
            <Box padding={sizes[size].paddingText}>
                <Text
                    fontWeight={sizes[size].fTextNameWeight}
                    fontSize={sizes[size].fTextNameSize}
                    lineHeight={sizes[size].lTextNameHeight}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    noOfLines={3}
                >
                    {text}
                </Text>
            </Box>
        </Card>
    );
});
