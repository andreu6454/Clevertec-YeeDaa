import { IconButton } from '@chakra-ui/icons';
import { Flex, Image } from '@chakra-ui/react';
import { memo } from 'react';

import SearchFilterIcon from '~/assets/svg/searchFilters.svg';
import { Search } from '~/components/SearchBlock/Search/Search';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

type SearchButtonsProps = {
    onClickHandler: () => void;
    onSearchHandleWithCategories: () => void;
    setBlur: () => void;
    setFocus: () => void;
    isSearchFilterOn: boolean;
    allergensLength: number;
};

const Size = {
    Desktop: 'lg',
    Laptop: 'lg',
    Tablet: 'sm',
    Mobile: 'sm',
};

export const SearchWithButtons = memo((props: SearchButtonsProps) => {
    const {
        onSearchHandleWithCategories,
        isSearchFilterOn,
        setFocus,
        setBlur,
        onClickHandler,
        allergensLength,
    } = props;
    const { screenSize } = useScreenSize();

    return (
        <Flex gap='12px' marginBottom='12px'>
            <IconButton
                data-test-id='filter-button'
                onClick={onClickHandler}
                borderColor='rgba(0, 0, 0, 0.48)'
                size={Size[screenSize]}
                variant='outline'
                aria-label='filter'
            >
                <Image src={SearchFilterIcon} />
            </IconButton>
            <Search
                allergensLength={allergensLength}
                onSearchHandle={onSearchHandleWithCategories}
                setBlur={setBlur}
                setFocus={setFocus}
                isSearchFilterOn={isSearchFilterOn}
            />
        </Flex>
    );
});
