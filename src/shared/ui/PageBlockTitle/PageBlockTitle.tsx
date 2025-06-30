import { Text } from '@chakra-ui/react';

interface PageBlockTitleProps {
    title: string;
}

export const PageBlockTitle = (props: PageBlockTitleProps) => {
    const { title } = props;

    return (
        <Text
            fontWeight='500'
            fontSize={{ base: '24px', xl: '36px', '2xl': '48px' }}
            lineHeight={{ base: '133%', xl: '111%', '2xl': '100%' }}
            marginBottom={{ base: '12px', xl: '24px' }}
        >
            {title}
        </Text>
    );
};
