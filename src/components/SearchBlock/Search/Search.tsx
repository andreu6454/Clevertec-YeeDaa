import { IconButton, Input, InputGroup } from '@chakra-ui/icons';
import { Image, InputRightElement } from '@chakra-ui/react';
import { ChangeEvent, memo, useEffect, useRef, useState } from 'react';

import SearchIcon from '~/assets/svg/searchIcon.svg';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { useAppDispatch, useAppSelector } from '~/store/hooks';
import {
    resultEmptySelector,
    searchCompletedSelector,
    searchErrorSelector,
    searchInputSelector,
    setSearchInputValue,
} from '~/store/recipesListPage-slice';

interface SearchProps {
    setFocus: () => void;
    setBlur: () => void;
    isSearchFilterOn: boolean;
    onSearchHandle: () => void;
    allergensLength?: number;
}

const Sizes = {
    Desktop: {
        size: 'lg',
        inputWidth: '458px',
    },
    Laptop: {
        size: 'lg',
        inputWidth: '458px',
    },
    Tablet: {
        size: 'sm',
        inputWidth: '404px',
    },
    Mobile: {
        size: 'sm',
        inputWidth: '284px',
    },
};

export const Search = memo((props: SearchProps) => {
    const { screenSize } = useScreenSize();
    const { setBlur, setFocus, isSearchFilterOn, onSearchHandle, allergensLength = 0 } = props;
    const inputRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState(false);

    const dispatch = useAppDispatch();
    const searchValue = useAppSelector(searchInputSelector);
    const searchError = useAppSelector(searchErrorSelector);
    const searchCompleted = useAppSelector(searchCompletedSelector);
    const isResultEmpty = useAppSelector(resultEmptySelector);

    const onSearchChangeHandle = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSearchInputValue(e.currentTarget.value));
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !(e.target instanceof HTMLInputElement)) {
                inputRef.current?.focus();
                e.preventDefault();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        if (searchValue.length < 3 && isSearchFilterOn) {
            setError(true);
            return;
        }
        setError(false);
    }, [searchValue, isSearchFilterOn]);

    const onClickHandle = () => {
        if (!isSearchFilterOn && allergensLength === 0) {
            setFocus();
            inputRef.current?.focus();
        }
        if (searchValue.length >= 2 || allergensLength > 0) {
            onSearchHandle();
            inputRef.current?.blur();
        }
    };

    let borderColor: string;

    if (searchError || isResultEmpty) {
        borderColor = 'red';
    } else if (searchCompleted && !searchError && searchValue.length !== 0 && !isResultEmpty) {
        borderColor = '#2db100';
    } else {
        borderColor = 'rgba(0, 0, 0, 0.48)';
    }

    return (
        <InputGroup
            onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.focus()}
            borderColor={borderColor}
            width={Sizes[screenSize].inputWidth}
        >
            <Input
                ref={inputRef}
                data-test-id='search-input'
                value={searchValue}
                onChange={onSearchChangeHandle}
                onFocus={setFocus}
                onBlur={setBlur}
                color='black'
                size={Sizes[screenSize].size}
                placeholder='Название или ингредиент...'
                _placeholder={{ color: '#134b00' }}
            />
            <InputRightElement
                aria-disabled={error}
                _disabled={{
                    opacity: 0.5,
                }}
                boxSize={Sizes[screenSize].size === 'lg' ? '48px' : '32px'}
            >
                <IconButton
                    pointerEvents={error ? 'none' : 'auto'}
                    data-test-id='search-button'
                    onClick={onClickHandle}
                    disabled={error && (!!searchValue || !(allergensLength > 0))}
                    variant='ghost'
                    size={Sizes[screenSize].size}
                    aria-label='search'
                    _hover={{
                        backgroundColor: 'none',
                    }}
                    _active={{
                        backgroundColor: 'none',
                    }}
                >
                    <Image
                        width={Sizes[screenSize].size === 'lg' ? '31px' : '24px'}
                        height={Sizes[screenSize].size === 'lg' ? '31px' : '24px'}
                        src={SearchIcon}
                    />
                </IconButton>
            </InputRightElement>
        </InputGroup>
    );
});
