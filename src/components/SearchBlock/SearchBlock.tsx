import { useBoolean } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { Filters } from '~/components/Filters/Filters';
import { SearchAllergens } from '~/components/SearchBlock/Allergens/SearchAllergens';
import { SearchWithButtons } from '~/components/SearchBlock/SearchButtons/SearchWithButtons';
import { SearchLoader } from '~/components/SearchBlock/SearchLoader/SearchLoader';
import { SearchEmptyTitle } from '~/components/SearchBlock/SearchTitle/SearchEmptyTitle';
import { SearchTitle } from '~/components/SearchBlock/SearchTitle/SearchTitle';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import { openFilters } from '~/store/slices/app-slice';
import {
    allergensSelector,
    inputLoadingSelector,
    resultEmptySelector,
    setClearFilters,
    setCurrentPageCategories,
} from '~/store/slices/recipesListPage-slice';

const Sizes = {
    Desktop: {
        width: '898px',
        height: '248px',
        paddingY: '32px 0 32px 0',
        inputWidth: '458px',
    },
    Laptop: {
        width: '578px',
        height: '248px',
        paddingY: '32px 0 32px 0',
        inputWidth: '458px',
    },
    Tablet: {
        width: '727px',
        height: '80px',
        paddingY: '16px 0 32px 0',
        inputWidth: '404px',
    },
    Mobile: {
        width: '328px',
        height: '80px',
        paddingY: '16px 0 32px 0',
        inputWidth: '284px',
    },
};

interface FoodSearchCardProps {
    title: string;
    description?: string;
    onSearchHandle?: () => void;
}

export const SearchBlock = memo((props: FoodSearchCardProps) => {
    const { title, description, onSearchHandle } = props;

    const allergens = useAppSelector(allergensSelector);
    const [isSearchFilterOn, { on: setFocus, off: setBlur }] = useBoolean(false);
    const isInputLoading = useAppSelector(inputLoadingSelector);
    const isResultEmpty = useAppSelector(resultEmptySelector);

    const { screenSize, isDesktop, isLaptop, isMobile } = useScreenSize();

    const dispatch = useAppDispatch();

    const onSearchHandleWithCategories = () => {
        dispatch(setCurrentPageCategories());
        onSearchHandle?.();
    };

    const onClickHandler = () => {
        dispatch(setCurrentPageCategories());
        dispatch(setClearFilters());
        dispatch(openFilters());
    };

    if (isInputLoading && !isMobile) return <SearchLoader title={title} />;
    return (
        <Flex
            boxShadow={
                isSearchFilterOn
                    ? '0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                    : ''
            }
            width={Sizes[screenSize].width}
            flexDirection='column'
            borderRadius='24px'
            padding={Sizes[screenSize].paddingY}
            alignItems='center'
        >
            <Filters />

            {isResultEmpty ? (
                <SearchEmptyTitle />
            ) : (
                <SearchTitle title={title} description={description} />
            )}
            <SearchWithButtons
                isSearchFilterOn={isSearchFilterOn}
                onClickHandler={onClickHandler}
                onSearchHandleWithCategories={onSearchHandleWithCategories}
                setBlur={setBlur}
                setFocus={setFocus}
                allergensLength={allergens.length}
            />
            {(isDesktop || isLaptop) && <SearchAllergens />}
        </Flex>
    );
});
