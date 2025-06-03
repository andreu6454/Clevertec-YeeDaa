import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import SubscribeIcon from '~/assets/svg/subscribe.svg';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';

type CardWithAvatarButtonsProps = {
    isBlogsPage?: boolean;
    isFavorite?: boolean;
    onSubscribeHandler?: () => void;
    bookmarks?: number;
    subscribers?: number;
};

export const CardWithAvatarButtons = (props: CardWithAvatarButtonsProps) => {
    const { isBlogsPage, isFavorite, onSubscribeHandler, subscribers, bookmarks } = props;

    if (!isBlogsPage) return null;
    return (
        <Flex marginTop='auto' width='100%' justifyContent='space-between' alignItems='center'>
            <Flex gap='8px'>
                {isFavorite ? (
                    <Button
                        backgroundColor='#b1ff2e'
                        color='#000'
                        size='sm'
                        padding='0 12px'
                        height='24px'
                    >
                        Рецепты
                    </Button>
                ) : (
                    <Button
                        backgroundColor='#000'
                        color='#fff'
                        size='sm'
                        padding='0 12px'
                        height='24px'
                        leftIcon={<Image src={SubscribeIcon} />}
                        onClick={onSubscribeHandler}
                    >
                        Подписаться
                    </Button>
                )}
                <Button
                    variant='outlined'
                    border='1px solid #2db100'
                    color='#2db100'
                    size='sm'
                    padding='0 12px'
                    height='24px'
                >
                    Читать
                </Button>
            </Flex>

            <Flex>
                <ReactionCount size='small' variant='bookmark' count={bookmarks || 0} />
                <ReactionCount size='small' variant='people' count={subscribers || 0} />
            </Flex>
        </Flex>
    );
};
