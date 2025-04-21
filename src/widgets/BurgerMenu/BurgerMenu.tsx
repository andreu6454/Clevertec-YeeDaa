import { Flex } from '@chakra-ui/react';
import { memo, ReactNode } from 'react';

import { useScrollLock } from '~/hooks/useScrollLock';

interface BurgerMenuProps {
    width: string;
    height: string;
    children: ReactNode;
    isOpen: boolean;
    closeHandler: () => void;
}

export const BurgerMenu = memo((props: BurgerMenuProps) => {
    const { width, height, isOpen, children, closeHandler } = props;

    useScrollLock(isOpen);
    return (
        <Flex
            onClick={closeHandler}
            top={0}
            left={0}
            backgroundColor='rgba(0, 0, 0, 0.16)'
            background={{ blur: '4px' }}
            position='absolute'
            width='100vw'
            height='100vh'
            justify='flex-end'
            zIndex={11}
            pointerEvents='auto'
        >
            <Flex
                overflowY='scroll'
                backgroundColor='#fff'
                height={height}
                width={width}
                pointerEvents='auto'
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </Flex>
        </Flex>
    );
});
