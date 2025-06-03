import { Image } from '@chakra-ui/icons';
import { Button } from '@chakra-ui/react';

import SubscribeIcon from '~/assets/svg/subscribe.svg';
import SubscribedIcon from '~/assets/svg/subscribedIcon.svg';

type SubscribeButtonProps = {
    onSubscribeHandler?: () => void;
    isSubscribed?: boolean;
};

export const SubscribeButton = ({ onSubscribeHandler, isSubscribed }: SubscribeButtonProps) => (
    <Button
        backgroundColor={isSubscribed ? 'transparent' : '#000'}
        border='1px solid rgba(0, 0, 0, 0.48)'
        variant={isSubscribed ? 'outlined' : 'solid'}
        color={isSubscribed ? '#000' : '#fff'}
        size='sm'
        padding='0 12px'
        height='24px'
        leftIcon={<Image src={isSubscribed ? SubscribedIcon : SubscribeIcon} />}
        onClick={onSubscribeHandler}
    >
        {isSubscribed ? 'Вы подписаны' : 'Подписаться'}
    </Button>
);
