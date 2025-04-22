import { useEffect } from 'react';

export function useScrollLock(isBurgerOpen: boolean) {
    useEffect(() => {
        if (isBurgerOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [isBurgerOpen]);
}
