import { Card } from '@chakra-ui/icons';
import { Button, HStack, Image, Text } from '@chakra-ui/react';

interface CardWithIconProps {
    icon: string;
    title: string;
    onClick?: () => void;
}

export const CardWithIcon = (props: CardWithIconProps) => {
    const { icon, title, onClick } = props;

    return (
        <Card
            cursor='pointer'
            onClick={onClick}
            _hover={{
                boxShadow:
                    '0 4px 8px -2px rgba(32, 126, 0, 0.1), 0 6px 12px -2px rgba(32, 126, 0, 0.15)',
                transition: 'all 0.3s ease',
            }}
            flexShrink={0}
            padding='12px'
            direction='row'
            alignItems='center'
            width={{ base: '100%', md: '232px', xl: '283px', '2xl': '668px' }}
            height={{ base: '52px', md: '48px', xl: '52px', '2xl': '56px' }}
            gap='8px'
            justifyContent='space-between'
        >
            <HStack gap='8px' width={{ base: '208px', md: '112px', xl: '160px', '2xl': '525px' }}>
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
