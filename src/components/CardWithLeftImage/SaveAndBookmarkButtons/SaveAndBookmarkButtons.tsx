import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import BookmarkIcon from '~/assets/svg/bookmark.svg';
import { useBookmarkRecipeMutation } from '~/query/services/recipes';
import { ErrorResponse } from '~/query/types/types';
import { NEW_RECIPE_ALERTS } from '~/shared/constants/alertStatuses/newRecipeAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useScreenSize } from '~/shared/hooks/useScreenSize';

type SaveAndBookmarkButtonsProps = {
    onClickHandler?: () => void;
    index?: number;
    id?: string;
    isBookmarked?: boolean;
};

export const SaveAndBookmarkButtons = ({
    onClickHandler,
    index,
    id,
    isBookmarked,
}: SaveAndBookmarkButtonsProps) => {
    const { isTabletMobile, isMobile } = useScreenSize();

    const [bookmark] = useBookmarkRecipeMutation();
    const errorAlert = useAlertToast();

    const onBookmarkHandle = async () => {
        if (!id) return;
        try {
            await bookmark(id).unwrap();
        } catch (error) {
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                errorAlert(NEW_RECIPE_ALERTS.serverError, false);
            }
        }
    };
    if (isBookmarked) {
        return (
            <Flex justifyContent='flex-end' gap='8px'>
                <Button
                    onClick={onBookmarkHandle}
                    padding={{ base: '6px 0 6px 6px', xl: '' }}
                    leftIcon={isMobile ? undefined : <Image src={BookmarkIcon} />}
                    size={{ base: 'xs', xl: 'sm' }}
                    variant='outline'
                    colorScheme='black'
                >
                    Убрать из сохраненных
                </Button>
            </Flex>
        );
    }

    return (
        <Flex justifyContent='flex-end' gap='8px'>
            <Button
                onClick={onBookmarkHandle}
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
