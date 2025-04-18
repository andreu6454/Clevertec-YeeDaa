import { Image } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import SergeyAvatar from '../../../assets/avatars/sergey.png';
import SubcsribeIcon from '../../../assets/svg/subscribe.svg';

export const RecipeAuthor = memo(() => (
    <Flex
        backgroundColor='#c4ff61'
        borderRadius='8px'
        padding='24px'
        width='578px'
        height='144px'
        gap='16px'
    >
        <Avatar src={SergeyAvatar} size='xl' />
        <Flex height='100%' width='100%' direction='column' justifyContent='space-between'>
            <Flex width='100%' justifyContent='space-between'>
                <Flex gap='4px' direction='column'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                        Сергей Разумов
                    </Text>
                    <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.64)'>
                        @serge25
                    </Typography>
                </Flex>
                <Typography Size={TypographySizes.sm}>Автор рецепта</Typography>
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
));
