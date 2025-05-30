import { useDisclosure } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useBlocker } from 'react-router';

export const useBlockerWithModal = (shouldBlock: boolean) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const blocker = useBlocker(() => shouldBlock);

    const continueNavigation = () => {
        onClose();
        blocker.proceed?.();
    };

    const cancelNavigation = () => {
        onClose();
        blocker.reset?.();
    };

    useEffect(() => {
        if (blocker.state === 'blocked') onOpen();
    }, [blocker, onOpen]);

    return { isOpen, onClose, continueNavigation, cancelNavigation };
};
