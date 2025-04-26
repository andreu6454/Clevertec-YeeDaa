import { Image } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import SergeyAvatar from '../../../assets/avatars/sergey.png';
import SubcsribeIcon from '../../../assets/svg/subscribe.svg';

interface RecipeAuthorProps {
    screenSize: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
    isMobile: boolean;
}

const sizes = {
    Desktop: {
        width: '668px',
        padding: '24px',
    },
    Laptop: {
        width: '578px',
        padding: '24px',
    },
    Tablet: {
        width: '604px',
        padding: '12px',
    },
    Mobile: {
        width: '328px',
        padding: '8px 8px 12px 12px',
    },
};

export const RecipeAuthor = memo((props: RecipeAuthorProps) => {
    const { screenSize, isMobile } = props;

    return (
        <Flex
            backgroundColor='#c4ff61'
            borderRadius='8px'
            padding={sizes[screenSize].padding}
            width={sizes[screenSize].width}
            height={isMobile ? '120px' : '144px'}
            gap='16px'
            alignItems='center'
        >
            <Avatar src={SergeyAvatar} size='xl' />
            <Flex height='100%' width='100%' direction='column' justifyContent='space-between'>
                <Flex width='100%' direction='column'>
                    {isMobile && (
                        <Typography width='100%' textAlign='end' Size={TypographySizes.sm}>
                            Автор рецепта
                        </Typography>
                    )}
                    <Flex width='100%' justifyContent='space-between'>
                        <Flex gap={isMobile ? '' : '4px'} direction='column'>
                            <Text
                                fontWeight={isMobile ? '600' : '700'}
                                fontSize={isMobile ? '18px' : '24px'}
                                lineHeight={isMobile ? '156%' : '133%'}
                                textAlign='center'
                            >
                                Сергей Разумов
                            </Text>
                            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.64)'>
                                @serge25
                            </Typography>
                        </Flex>
                        {!isMobile && (
                            <Typography Size={TypographySizes.sm}>Автор рецепта</Typography>
                        )}
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Button
                        size='xs'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        backgroundColor='rgba(0, 0, 0, 0.92)'
                        leftIcon={<Image src={SubcsribeIcon} width='12px' height='12px' />}
                        color='#fff'
                    >
                        Подписаться
                    </Button>
                    <ReactionCount count={125} size='small' variant='people' />
                </Flex>
            </Flex>
        </Flex>
    );
});
