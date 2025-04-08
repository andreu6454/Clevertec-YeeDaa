import { Card } from '@chakra-ui/icons';
import { Button, HStack, Image, Text } from '@chakra-ui/react';

const sizes = {
    Desktop: {
        width: '668px',
        height: '56px',
    },
    Laptop: {
        width: '283px',
        height: '52px',
    },
    Tablet: {
        width: '240px',
        height: '52px',
    },
    Mobile: {
        width: '328px',
        height: '52px',
    },
};

interface CardWithIconProps {
    icon: string;
    title: string;
    size: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile';
}

export const CardWithIcon = (props: CardWithIconProps) => {
    const { icon, title, size } = props;

    return (
        <Card
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            padding='12px'
            direction='row'
            alignItems='center'
            width={sizes[size].width}
            height={sizes[size].height}
            gap='8px'
            justifyContent='space-between'
        >
            <HStack>
                <Image src={icon} />
                <Text whiteSpace='nowrap' overflow='hidden' textOverflow='ellipsis'>
                    {title}
                </Text>
            </HStack>
            <Button
                flexShrink={0}
                color='#2db100'
                borderColor='#2db100'
                variant='outline'
                size='sm'
            >
                Готовить
            </Button>
        </Card>
    );
};
