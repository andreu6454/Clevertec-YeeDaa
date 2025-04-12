import { Text, TextProps } from '@chakra-ui/react';

interface TypographyProps extends TextProps {
    children: string;
    Size: TypographySizes;
    noOfLines?: number;
}

export const enum TypographySizes {
    xs = 'xs',
    sm = 'sm',
    md = 'md',
    lg = 'lg',
    xl = 'xl',
}

const Sizes = {
    xs: {
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '133%',
    },
    sm: {
        fontWeight: '400',
        fontSize: '14px',
        lineHeight: '143%',
    },
    md: {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '150%',
    },
    lg: {
        fontWeight: '500',
        fontSize: '18px',
        lineHeight: '156%',
    },
    xl: {
        fontWeight: '500',
        fontSize: '20px',
        lineHeight: '140%',
    },
};

export const Typography = (props: TypographyProps) => {
    const { children, Size, ...restProps } = props;

    return (
        <Text
            fontWeight={Sizes[Size].fontWeight}
            fontSize={Sizes[Size].fontSize}
            lineHeight={Sizes[Size].lineHeight}
            {...restProps}
        >
            {children}
        </Text>
    );
};

export default Text;
