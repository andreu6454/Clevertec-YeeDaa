import { Flex, Tag, Text } from '@chakra-ui/react';

interface TagsProps {
    elements: string[];
    trim?: boolean;
}

export const Tags = (props: TagsProps) => {
    const { elements, trim } = props;

    const mappedTags = elements.map((el) => (
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
        <Flex width='200px' gap='8px' flexWrap='wrap'>
            {mappedTags}
        </Flex>
    );
};
