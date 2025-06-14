import { Drawer } from '@chakra-ui/icons';
import { DrawerContent, DrawerOverlay } from '@chakra-ui/react';

import { FiltersMenuContent } from '~/components/Filters/FiltersMenuContent/FiltersMenuContent';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { closeFilters, isFiltersOpenSelector } from '~/store/slices/app-slice';

export const Filters = () => {
    const { isDesktopLaptop } = useScreenSize();
    const isFiltersOpen = useAppSelector(isFiltersOpenSelector);

    const dispatch = useAppDispatch();

    const onClickHandler = () => {
        dispatch(closeFilters());
    };

    if (!isFiltersOpen) {
        return null;
    }
    return (
        <Drawer
            size={isDesktopLaptop ? 'sm' : 'xs'}
            isOpen={isFiltersOpen}
            placement='right'
            onClose={onClickHandler}
        >
            <DrawerOverlay />
            <DrawerContent data-test-id='filter-drawer' width={isDesktopLaptop ? '463px' : '344px'}>
                <FiltersMenuContent />
            </DrawerContent>
        </Drawer>
    );
};
