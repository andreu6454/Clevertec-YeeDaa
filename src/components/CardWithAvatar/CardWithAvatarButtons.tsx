import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { APP_PATHS } from '~/shared/constants/pathes';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { SubscribeButton } from '~/shared/ui/SubscribeButton/SubscribeButton';

type CardWithAvatarButtonsProps = {
    isBlogsPage?: boolean;
    isFavorite?: boolean;
    onSubscribeHandler?: () => void;
    bookmarks?: number;
    subscribers?: number;
    bloggerId?: string;
};

export const CardWithAvatarButtons = (props: CardWithAvatarButtonsProps) => {
    const { isBlogsPage, isFavorite, onSubscribeHandler, subscribers, bookmarks, bloggerId } =
        props;

    const navigate = useNavigate();

    const onReadClick = () => {
        navigate(`${APP_PATHS.blogs}/${bloggerId}`);
    };

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
                    <SubscribeButton onSubscribeHandler={onSubscribeHandler} />
                )}
                <Button
                    onClick={onReadClick}
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
