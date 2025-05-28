import { Flex, Tag, Text } from '@chakra-ui/react';

interface TagsProps {
    elements: string[];
    trim?: boolean;
    width?: string;
    cutOn?: number;
}

export const Tags = (props: TagsProps) => {
    const { elements, trim, width = '200px', cutOn } = props;

    let elementForMap = elements;

    if (cutOn && elements.length - cutOn >= 1) {
        const restNumber = `+${elements.length - cutOn}`;
        elementForMap = [...elements.slice(0, cutOn), restNumber];
    }

    const mappedTags = elementForMap.map((el) => (
        <Tag
            key={el + 'tag'}
            color='#2db100'
            border='1px solid #b1ff2e'
            borderRadius='6px'
            padding='0px 8px'
            height='20px'
            backgroundColor='white'
        >
            <Text fontWeight='500' fontSize='12px' lineHeight='133%'>
                {trim ? el.split(' ')[0] : el}
            </Text>
        </Tag>
    ));

    return (
        <Flex width={width} gap='8px' flexWrap='wrap'>
            {mappedTags}
        </Flex>
    );
};
