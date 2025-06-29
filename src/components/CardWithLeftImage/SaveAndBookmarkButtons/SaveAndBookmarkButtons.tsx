import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import BookmarkIcon from '~/assets/svg/bookmark.svg';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

type SaveAndBookmarkButtonsProps = {
    onClickHandler?: () => void;
    onBookmarkHandler?: () => void;
    index?: number;
    isBookmarked?: boolean;
};

export const SaveAndBookmarkButtons = ({
    onBookmarkHandler,
    onClickHandler,
    index,
    isBookmarked,
}: SaveAndBookmarkButtonsProps) => {
    const { isTabletMobile, isMobile } = useScreenSize();

    if (isBookmarked) {
        return (
            <Flex justifyContent='flex-end' gap='8px'>
                <Button
                    onClick={onBookmarkHandler}
                    padding={{ base: '6px 0 6px 6px', xl: '' }}
                    leftIcon={isMobile ? undefined : <Image src={BookmarkIcon} />}
                    size={{ base: 'xs', xl: 'sm' }}
                    variant='outline'
                    colorScheme='black'
                >
                    Убрать из сохранённых
                </Button>
            </Flex>
        );
    }

    return (
        <Flex justifyContent='flex-end' gap='8px'>
            <Button
                onClick={onBookmarkHandler}
                display='flex'
                padding={{ base: '6px 0 6px 6px', xl: '' }}
                leftIcon={<Image src={BookmarkIcon} />}
                size={{ base: 'xs', xl: 'sm' }}
                variant='outline'
                colorScheme='black'
            >
                {!isTabletMobile && 'Сохранить'}
            </Button>
            <Button
                data-test-id={`card-link-${index}`}
                onClick={onClickHandler}
                size={{ base: 'xs', xl: 'sm' }}
                backgroundColor='#000'
                color='#fff'
            >
                Готовить
            </Button>
        </Flex>
    );
};
