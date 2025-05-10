import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type SearchTitleProps = {
    title: string;
    description?: string;
};

const Sizes = {
    Desktop: {
        mbText: '32px',
        fSize: '48px',
        lHeight: '100%',
        textDescriptionSize: TypographySizes.md,
    },
    Laptop: {
        mbText: '32px',
        fSize: '48px',
        lHeight: '100%',
        textDescriptionSize: TypographySizes.md,
    },
    Tablet: {
        mbText: '16px',
        fSize: '24px',
        lHeight: '133%',
        textDescriptionSize: TypographySizes.sm,
    },
    Mobile: {
        mbText: '16px',
        fSize: '24px',
        lHeight: '133%',
        textDescriptionSize: TypographySizes.sm,
    },
};

export const SearchTitle = memo((props: SearchTitleProps) => {
    const { title, description } = props;
    const { screenSize, isDesktop, isLaptop } = useScreenSize();

    return (
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
    );
});
