import { HStack, Text } from '@chakra-ui/react';

type TextWithCountProps = {
    text: string;
    count: number;
    dataTestId?: string;
};

export const TextWithCount = ({ text, count, dataTestId }: TextWithCountProps) => (
    <HStack>
        <Text fontWeight='400' fontSize='20px' lineHeight='140%'>
            {text}
        </Text>
        <Text
            data-test-id={dataTestId}
            fontWeight='400'
            fontSize='20px'
            lineHeight='140%'
            color='rgba(0, 0, 0, 0.48)'
        >
            {`(${count})`}
        </Text>
    </HStack>
);

export default TextWithCount;
