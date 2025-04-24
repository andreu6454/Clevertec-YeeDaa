import { Image } from '@chakra-ui/icons';
import { Button, Flex, Text } from '@chakra-ui/react';

import { AllergensFilter } from '~/components/Filters/FiltersMenuContent/AllergensFilter/AllergensFilter';
import { AuthorFilter } from '~/components/Filters/FiltersMenuContent/AuthorFilter/AuthorFilter';
import { CategoryFilter } from '~/components/Filters/FiltersMenuContent/CategoryFilter/CategoryFilter';
import ChosenFilters from '~/components/Filters/FiltersMenuContent/ChosenFilters/ChosenFilters';
import { MeatFilter } from '~/components/Filters/FiltersMenuContent/MeatFilter/MeatFilter';
import { SideDishFilter } from '~/components/Filters/FiltersMenuContent/SideDishFilter/SideDishFilter';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { closeFilters } from '~/store/app-slice';
import { useAppDispatch } from '~/store/hooks';
import { setClearFilters, setFilteredData } from '~/store/recipesListPage-slice';

import CloseIcon from '../../../assets/svg/close.svg';

export const FiltersMenuContent = () => {
    const dispatch = useAppDispatch();

    const { isDesktopLaptop } = useScreenSize();

    const onCloseHandler = () => {
        dispatch(closeFilters());
    };

    const onFilterClickHandler = () => {
        dispatch(setFilteredData());
        dispatch(closeFilters());
    };

    const onClearFilterClickHandler = () => {
        dispatch(setClearFilters());
    };

    return (
        <Flex width='100%' height='100%' direction='column'>
            <Flex
                padding={isDesktopLaptop ? '32px' : '16px'}
                gap='24px'
                direction='column'
                width='100%'
                height='100%'
                overflowY='scroll'
            >
                <Flex paddingBottom='16px' justifyContent='space-between' alignItems='center'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%'>
                        Фильтр
                    </Text>
                    <Image
                        data-test-id='close-filter-drawer'
                        cursor='pointer'
                        onClick={onCloseHandler}
                        src={CloseIcon}
                    />
                </Flex>

                <CategoryFilter />
                <AuthorFilter />
                <MeatFilter />
                <SideDishFilter />
                <AllergensFilter />
                {/*<ChosenFilters/>*/}
            </Flex>
            <Flex direction='column' padding={isDesktopLaptop ? '32px' : '016px'} gap='32px'>
                <ChosenFilters />
                <Flex justifyContent='space-between'>
                    <Button
                        onClick={onClearFilterClickHandler}
                        variant='outline'
                        colorScheme='black'
                        size={isDesktopLaptop ? 'lg' : 'sm'}
                        data-test-id='clear-filter-button'
                    >
                        Очистить фильтр
                    </Button>
                    <Button
                        onClick={onFilterClickHandler}
                        color='#fff'
                        backgroundColor='rgba(0, 0, 0, 0.92)'
                        variant='solid'
                        size={isDesktopLaptop ? 'lg' : 'sm'}
                        data-test-id='find-recipe-button'
                    >
                        Найти рецепт
                    </Button>
                </Flex>
            </Flex>
        </Flex>
    );
};
