import { Image } from '@chakra-ui/icons';
import { Button, Tooltip } from '@chakra-ui/react';
import { useState } from 'react';

import SubscribeIcon from '~/assets/svg/subscribe.svg';
import SubscribedIcon from '~/assets/svg/subscribedIcon.svg';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type SubscribeButtonProps = {
    onSubscribeHandler?: () => void;
    isSubscribed?: boolean;
};

export const SubscribeButton = ({ onSubscribeHandler, isSubscribed }: SubscribeButtonProps) => {
    const [isSub, setIsSub] = useState(isSubscribed);

    const onClickHandler = () => {
        onSubscribeHandler?.();
        setIsSub((prev) => !prev);
    };

    return (
        <Tooltip
            data-test-id={DATA_TEST_IDS.blogTooltip}
            label='Нажмите, если хотите отписаться'
            width='144px'
            backgroundColor='#000'
            borderRadius='4px'
            hasArrow
        >
            <Button
                data-test-id={
                    isSub ? DATA_TEST_IDS.blogToggleUnsubscribe : DATA_TEST_IDS.blogToggleSubscribe
                }
                backgroundColor={isSub ? 'transparent' : '#000'}
                border='1px solid rgba(0, 0, 0, 0.48)'
                variant={isSub ? 'outlined' : 'solid'}
                color={isSub ? '#000' : '#fff'}
                size='sm'
                padding='0 12px'
                height='24px'
                leftIcon={<Image src={isSub ? SubscribedIcon : SubscribeIcon} />}
                onClick={onClickHandler}
            >
                {isSub ? 'Вы подписаны' : 'Подписаться'}
            </Button>
        </Tooltip>
    );
};
