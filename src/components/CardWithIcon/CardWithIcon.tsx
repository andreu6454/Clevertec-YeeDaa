import { Card } from '@chakra-ui/icons';
import { Button, HStack, Image, Text } from '@chakra-ui/react';

const sizes = {
    Desktop: {
        width: '668px',
        height: '56px',
        textWidth: '525px',
    },
    Laptop: {
        width: '283px',
        height: '52px',
        textWidth: '160px',
    },
    Tablet: {
        width: '232px',
        height: '48px',
        textWidth: '112px',
    },
    Mobile: {
        width: '328px',
        height: '52px',
        textWidth: '208px',
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
            <HStack gap='8px' width={sizes[size].textWidth}>
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
