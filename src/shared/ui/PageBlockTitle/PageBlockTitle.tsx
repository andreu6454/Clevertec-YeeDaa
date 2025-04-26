import { Text } from '@chakra-ui/react';

import { useScreenSize } from '~/shared/hooks/useScreenSize';

interface PageBlockTitleProps {
    title: string;
}

const sizes = {
    Desktop: {
        fontSize: '48px',
        lineHeight: '100%',
        marginBottom: '24px',
    },
    Laptop: {
        fontSize: '36px',
        lineHeight: '111%',
        marginBottom: '24px',
    },
    Tablet: {
        fontSize: '24px',
        lineHeight: '133%',
        marginBottom: '12px',
    },
    Mobile: {
        fontSize: '24px',
        lineHeight: '133%',
        marginBottom: '12px',
    },
};

export const PageBlockTitle = (props: PageBlockTitleProps) => {
    const { title } = props;
    const { screenSize } = useScreenSize();

    return (
        <Text
            fontWeight='500'
            fontSize={sizes[screenSize].fontSize}
            lineHeight={sizes[screenSize].lineHeight}
            marginBottom={sizes[screenSize].marginBottom}
        >
            {title}
        </Text>
    );
};
