import { IconButton, Input, InputGroup, Select, Switch } from '@chakra-ui/icons';
import { Flex, Image, InputRightElement, Text } from '@chakra-ui/react';

import { useScreenSize } from '~/hooks/useScreenSize';

import SearchFilterIcon from '../../assets/svg/searchFilters.svg';
import SearchIcon from '../../assets/svg/searchIcon.svg';

const Sizes = {
    Desktop: {
        width: '898px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Laptop: {
        width: '578px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        fDescSize: '16px',
        lDescHeight: '150%',
    },
    Tablet: {
        width: '727px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '404px',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
    Mobile: {
        width: '328px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '284px',
        fDescSize: '14px',
        lDescHeight: '143%',
    },
};

interface FoodSearchCardProps {
    title: string;
    description?: string;
}

export const FoodSearchCard = (props: FoodSearchCardProps) => {
    const { title, description } = props;

    const { screenSize, isDesktop, isLaptop } = useScreenSize();

    return (
        <Flex
            width={Sizes[screenSize].width}
            flexDirection='column'
            marginBottom='32px'
            alignItems='center'
        >
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
                    <Text
                        width={isDesktop || isLaptop ? '696px' : '100%'}
                        color='rgba(0, 0, 0, 0.48)'
                        fontWeight='500'
                        fontSize={Sizes[screenSize].fDescSize}
                        lineHeight={Sizes[screenSize].lDescHeight}
                        textAlign='center'
                    >
                        {description}
                    </Text>
                )}
            </Flex>
            <Flex gap='12px' marginBottom='12px'>
                <IconButton
                    borderColor='rgba(0, 0, 0, 0.48)'
                    size={Sizes[screenSize].size}
                    variant='outline'
                    aria-label='filter'
                >
                    <Image src={SearchFilterIcon} />
                </IconButton>
                <InputGroup borderColor='rgba(0, 0, 0, 0.48)' width={Sizes[screenSize].inputWidth}>
                    <Input
                        color='black'
                        size={Sizes[screenSize].size}
                        placeholder='Название или ингредиент...'
                        _placeholder={{ color: '#134b00' }}
                    />
                    <InputRightElement boxSize={Sizes[screenSize].size === 'lg' ? '48px' : '32px'}>
                        <IconButton
                            variant='ghost'
                            size={Sizes[screenSize].size}
                            aria-label='search'
                        >
                            <Image
                                width={Sizes[screenSize].size === 'lg' ? '31px' : '24px'}
                                height={Sizes[screenSize].size === 'lg' ? '31px' : '24px'}
                                src={SearchIcon}
                            />
                        </IconButton>
                    </InputRightElement>
                </InputGroup>
            </Flex>
            {(isDesktop || isLaptop) && (
                <Flex width='518px' gap='16px'>
                    <Flex padding='6px 0 6px 8px' gap='12px' alignItems='center'>
                        <Text fontWeight='500' fontSize='16px' lineHeight='150%'>
                            Исключить мои аллергены
                        </Text>
                        <Switch size='md' />
                    </Flex>
                    <Select width='234px' placeholder='Выберите из списка...'></Select>
                </Flex>
            )}
        </Flex>
    );
};
