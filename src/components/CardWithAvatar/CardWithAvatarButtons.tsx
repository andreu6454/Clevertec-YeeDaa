import { Button, Flex } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
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
    isButtonsRow?: boolean;
};

export const CardWithAvatarButtons = (props: CardWithAvatarButtonsProps) => {
    const {
        isBlogsPage,
        isFavorite,
        onSubscribeHandler,
        subscribers,
        bookmarks,
        bloggerId,
        isButtonsRow,
    } = props;

    const navigate = useNavigate();

    const onReadClick = () => {
        navigate(`${APP_PATHS.blogs}/${bloggerId}#notes`);
    };

    if (!isBlogsPage) return null;
    return (
        <Flex
            marginTop='auto'
            width='100%'
            justifyContent='space-between'
            flexDirection={isButtonsRow ? 'row' : 'column-reverse'}
            alignItems={isButtonsRow ? 'center' : 'flex-end'}
            gap='16px'
        >
            <Flex gap='8px'>
                {isFavorite ? (
                    <Button
                        onClick={onReadClick}
                        backgroundColor='#b1ff2e'
                        color='#000'
                        size='sm'
                        padding='0 12px'
                        height='24px'
                        data-test-id={DATA_TEST_IDS.blogsCardRecipesButton}
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
                    data-test-id={DATA_TEST_IDS.blogsCardNotesButton}
                >
                    Читать
                </Button>
            </Flex>

            <Flex width='max-content'>
                <ReactionCount size='small' variant='bookmark' count={bookmarks || 0} />
                <ReactionCount size='small' variant='people' count={subscribers || 0} />
            </Flex>
        </Flex>
    );
};
