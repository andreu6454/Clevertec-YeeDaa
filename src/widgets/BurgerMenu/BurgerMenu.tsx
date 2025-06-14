import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { ZIndex } from '~/shared/constants/style/zIndex';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useScrollLock } from '~/shared/hooks/useScrollLock';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeBurgerMenu, isBurgerOpenSelector } from '~/store/slices/app-slice';
import { BurgerMenuContent } from '~/widgets/BurgerMenu/BurgerMenuContent/BurgerMenuContent';

export const BurgerMenu = memo(() => {
    const { isMobile } = useScreenSize();

    const isBurgerOpen = useAppSelector(isBurgerOpenSelector);
    const dispatch = useAppDispatch();

    const closeMenuHandler = () => {
        dispatch(closeBurgerMenu());
    };

    useScrollLock(isBurgerOpen);

    if (!isBurgerOpen) {
        return null;
    }

    return (
        <Flex
            onClick={closeMenuHandler}
            top='64px'
            left={0}
            backgroundColor='rgba(0, 0, 0, 0.16)'
            background={{ blur: '4px' }}
            position='fixed'
            width='100vw'
            height='100vh'
            justify='flex-end'
            zIndex={ZIndex.burger}
            pointerEvents='auto'
        >
            <Flex
                zIndex={ZIndex.burger}
                borderRadius='0 0 12px 12px'
                position='fixed'
                right={0}
                top='64px'
                overflowY='scroll'
                backgroundColor='#fff'
                height={isMobile ? '652px' : '868px'}
                width='344px'
                pointerEvents='auto'
                sx={{
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                }}
            >
                <BurgerMenuContent />
            </Flex>
        </Flex>
    );
});
