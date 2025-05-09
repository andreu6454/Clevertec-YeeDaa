import { IconButton, useBoolean } from '@chakra-ui/icons';
import { Flex, Image, Spinner, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { Filters } from '~/components/Filters/Filters';
import { SearchAllergens } from '~/components/SearchBlock/Allergens/SearchAllergens';
import { Search } from '~/components/SearchBlock/Search/Search';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { openFilters } from '~/store/app-slice';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    allergensSelector,
    inputLoadingSelector,
    setClearFilters,
    setCurrentPageCategories,
} from '~/store/recipesListPage-slice';

import SearchFilterIcon from '../../assets/svg/searchFilters.svg';

const Sizes = {
    Desktop: {
        width: '898px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        paddingY: '32px 0 32px 0',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        textDescriptionSize: TypographySizes.md,
    },
    Laptop: {
        width: '578px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        paddingY: '32px 0 32px 0',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        textDescriptionSize: TypographySizes.md,
    },
    Tablet: {
        width: '727px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        paddingY: '16px 0 32px 0',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '404px',
        textDescriptionSize: TypographySizes.sm,
    },
    Mobile: {
        width: '328px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        paddingY: '16px 0 32px 0',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '284px',
        textDescriptionSize: TypographySizes.sm,
    },
};

interface FoodSearchCardProps {
    title: string;
    description?: string;
    onSearchHandle: () => void;
}

export const SearchBlock = memo((props: FoodSearchCardProps) => {
    const { title, description, onSearchHandle } = props;

    const allergens = useAppSelector(allergensSelector);
    const [isSearchFilterOn, { on: setFocus, off: setBlur }] = useBoolean(false);
    const isInputLoading = useAppSelector(inputLoadingSelector);

    const { screenSize, isDesktop, isLaptop } = useScreenSize();

    const dispatch = useAppDispatch();

    const onSearchHandleWithCategories = () => {
        dispatch(setCurrentPageCategories());
        onSearchHandle();
    };

    // useEffect(() => {
    //     if(isAllergensFilterOn && !isFiltersOpen){
    //         onSearchHandleWithCategories();
    //     }
    // }, [allergens]);

    const onClickHandler = () => {
        dispatch(setCurrentPageCategories());
        dispatch(setClearFilters());
        dispatch(openFilters());
    };

    if (isInputLoading) {
        return (
            <Flex
                boxShadow='0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 20px 25px -5px rgba(0, 0, 0, 0.1)'
                width={Sizes[screenSize].width}
                flexDirection='column'
                borderRadius='24px'
                padding={Sizes[screenSize].paddingY}
                alignItems='center'
            >
                <Text
                    fontWeight='700'
                    fontSize={Sizes[screenSize].fSize}
                    lineHeight={Sizes[screenSize].lHeight}
                    textAlign='center'
                >
                    {title}
                </Text>
                <Flex alignItems='center' justifyContent='center' width='134px' height='134px'>
                    <Flex
                        alignItems='center'
                        justifyContent='center'
                        width='80px'
                        height='80px'
                        background='radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)'
                    >
                        <Spinner data-test-id='loader-search-block' size='sm' />
                    </Flex>
                </Flex>
            </Flex>
        );
    }
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
            <Flex
                direction='column'
                alignItems='center'
                textAlign='center'
                gap='12px'
                marginBottom={Sizes[screenSize].mbText}
            >
                <Text
                    fontWeight='700'
                    fontSize={Sizes[screenSize].fSize}
                    lineHeight={Sizes[screenSize].lHeight}
                    textAlign='center'
                >
                    {title}
                </Text>
                {description && (
                    <Typography
                        Size={Sizes[screenSize].textDescriptionSize}
                        width={isDesktop || isLaptop ? '696px' : '100%'}
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign='center'
                    >
                        {description}
                    </Typography>
                )}
            </Flex>
            <Flex gap='12px' marginBottom='12px'>
                <IconButton
                    data-test-id='filter-button'
                    onClick={onClickHandler}
                    borderColor='rgba(0, 0, 0, 0.48)'
                    size={Sizes[screenSize].size}
                    variant='outline'
                    aria-label='filter'
                >
                    <Image src={SearchFilterIcon} />
                </IconButton>
                <Search
                    allergensLength={allergens.length}
                    onSearchHandle={onSearchHandleWithCategories}
                    setBlur={setBlur}
                    setFocus={setFocus}
                    isSearchFilterOn={isSearchFilterOn}
                />
            </Flex>
            {(isDesktop || isLaptop) && <SearchAllergens />}
        </Flex>
    );
});
