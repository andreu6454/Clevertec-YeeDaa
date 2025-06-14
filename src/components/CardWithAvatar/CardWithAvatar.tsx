import { Box, Card } from '@chakra-ui/icons';
import { Avatar, Flex } from '@chakra-ui/react';
import { memo } from 'react';

import CardWithAvatarBadge from '~/components/CardWithAvatar/CardWithAvatarBadge';
import { CardWithAvatarButtons } from '~/components/CardWithAvatar/CardWithAvatarButtons';
import { CardWithAvatarLoader } from '~/components/CardWithAvatar/CardWithAvatarLoader';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CardWithAvatarProps {
    name: string;
    username: string;
    text: string;
    bloggerId?: string;
    isLoading?: boolean;
    isBlogsPage?: boolean;
    bookmarks?: number;
    subscribers?: number;
    isFavorite?: boolean;
    newRecipesCount?: number;
    onSubscribeHandler?: () => void;
    onCardClick?: () => void;
    width?: string;
    isButtonsRow?: boolean;
}

export const CardWithAvatar = memo((props: CardWithAvatarProps) => {
    const {
        text,
        username,
        name,
        isBlogsPage,
        bookmarks,
        subscribers,
        isFavorite,
        newRecipesCount,
        onSubscribeHandler,
        bloggerId,
        isLoading,
        onCardClick,
        width,
        isButtonsRow = true,
    } = props;
    const { isDesktopLaptop } = useScreenSize();

    const cardWidth = width
        ? width
        : isBlogsPage
          ? isFavorite
              ? { base: '304px', md: '346px', xl: '408px', '2xl': '648px' }
              : { base: '304px', md: '346px', xl: '408px', '2xl': '426px' }
          : { base: '304px', md: '226px', xl: '266px', '2xl': '426px' };

    const cardHeight = isBlogsPage
        ? isFavorite
            ? { base: '208px', xl: '224px' }
            : { base: '208px', xl: '224px' }
        : { base: '152px', xl: '160px', '2xl': '184px' };

    const nameSize = isDesktopLaptop
        ? isBlogsPage
            ? TypographySizes.lg
            : TypographySizes.md
        : TypographySizes.lg;

    return (
        <Card
            data-test-id={DATA_TEST_IDS.blogsCard}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            flexGrow={1}
            width={cardWidth}
            height={cardHeight}
            onClick={onCardClick}
            cursor='pointer'
        >
            <Flex
                width='100%'
                height='100%'
                padding={{ base: '16px', '2xl': '24px' }}
                gap={{ base: '16px', '2xl': '32px' }}
                flexDirection='column'
            >
                <Flex alignItems='center' width='100%' gap='12px'>
                    <Avatar size={{ base: 'sm', xl: 'md' }} name={name} />
                    <Box width='100%' minWidth={0}>
                        <Typography
                            data-test-id={DATA_TEST_IDS.blogsCardName}
                            Size={nameSize}
                            paddingTop={isFavorite ? '8px' : ''}
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                        >
                            {name}
                        </Typography>
                        <Typography
                            data-test-id={DATA_TEST_IDS.blogsCardLogin}
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                            Size={isDesktopLaptop ? TypographySizes.xs : TypographySizes.sm}
                        >
                            {username}
                        </Typography>
                    </Box>
                    <CardWithAvatarBadge
                        isFavorite={isFavorite}
                        newRecipesCount={newRecipesCount}
                    />
                </Flex>
                <Typography
                    data-test-id={DATA_TEST_IDS.blogsCardNoteText}
                    height={isFavorite ? '64px' : 'max-content'}
                    Size={TypographySizes.sm}
                    overflow='hidden'
                    textOverflow='ellipsis'
                    noOfLines={3}
                >
                    {text}
                </Typography>
                <CardWithAvatarButtons
                    bloggerId={bloggerId}
                    isBlogsPage={isBlogsPage}
                    isFavorite={isFavorite}
                    onSubscribeHandler={onSubscribeHandler}
                    subscribers={subscribers}
                    bookmarks={bookmarks}
                    isButtonsRow={isButtonsRow}
                />
            </Flex>
            <CardWithAvatarLoader isLoading={isLoading} height={cardHeight} width={cardWidth} />
        </Card>
    );
});
