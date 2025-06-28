import { Image } from '@chakra-ui/icons';
import { Avatar, Button, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { useToggleSubscriptionMutation } from '~/query/services/bloggers';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

import SubscribeIcon from '../../../assets/svg/subscribe.svg';

interface RecipeAuthorProps {
    fullName: string;
    login: string;
    avatar: string;
    id: string;
}

export const RecipeAuthor = memo((props: RecipeAuthorProps) => {
    const { fullName, login, avatar, id } = props;

    const { isMobile } = useScreenSize();

    const userId = useAppSelector(userIdSelector);
    const [toggleSubscribe] = useToggleSubscriptionMutation();

    const onToggleSubscribe = () => {
        toggleSubscribe({ bloggerId: id, userId: userId });
    };

    return (
        <Flex
            backgroundColor='#c4ff61'
            borderRadius='8px'
            padding={{ base: '8px 8px 12px 12px', md: '12px', xl: '24px' }}
            width={{ base: '100%', md: '604px', xl: '578px', '2xl': '668px' }}
            height={{ base: '120px', md: '144px' }}
            gap='16px'
            alignItems='center'
        >
            <Avatar name={fullName} src={getImageUrl(avatar)} size='xl' />
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
                                fontWeight={{ base: '600', md: '700' }}
                                fontSize={{ base: '18px', md: '24px' }}
                                lineHeight={{ base: '156%', md: '133%' }}
                                textAlign='center'
                            >
                                {fullName}
                            </Text>
                            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.64)'>
                                {`@${login}`}
                            </Typography>
                        </Flex>
                        {!isMobile && (
                            <Typography Size={TypographySizes.sm}>Автор рецепта</Typography>
                        )}
                    </Flex>
                </Flex>
                <Flex justifyContent='space-between'>
                    <Button
                        onClick={onToggleSubscribe}
                        size='xs'
                        border='1px solid rgba(0, 0, 0, 0.08)'
                        backgroundColor='rgba(0, 0, 0, 0.92)'
                        leftIcon={<Image src={SubscribeIcon} width='12px' height='12px' />}
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
