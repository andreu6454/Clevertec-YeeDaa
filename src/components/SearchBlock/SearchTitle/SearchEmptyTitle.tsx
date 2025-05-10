import { Flex } from '@chakra-ui/react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

const Sizes = {
    Desktop: {
        mbText: '32px',
    },
    Laptop: {
        mbText: '32px',
    },
    Tablet: {
        mbText: '16px',
    },
    Mobile: {
        mbText: '16px',
    },
};

export const SearchEmptyTitle = () => {
    const { screenSize } = useScreenSize();

    return (
        <Flex
            width='320px'
            direction='column'
            alignItems='center'
            textAlign='center'
            gap='12px'
            marginBottom={Sizes[screenSize].mbText}
        >
            <Typography Size={TypographySizes.md} textAlign='center'>
                По вашему запросу ничего не найдено.Попробуйте другой запрос
            </Typography>
        </Flex>
    );
};
