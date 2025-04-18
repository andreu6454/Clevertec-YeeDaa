import { IconButton, Input, InputGroup, Select, Switch } from '@chakra-ui/icons';
import { Flex, Image, InputRightElement, Text } from '@chakra-ui/react';

import { useScreenSize } from '~/hooks/useScreenSize';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import SearchFilterIcon from '../../assets/svg/searchFilters.svg';
import SearchIcon from '../../assets/svg/searchIcon.svg';

const Sizes = {
    Desktop: {
        width: '898px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        paddingY: '32px 0 32px 0',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        textDescriptionSize: TypographySizes.md,
    },
    Laptop: {
        width: '578px',
        height: '248px',
        size: 'lg',
        mbText: '32px',
        paddingY: '32px 0 32px 0',
        fSize: '48px',
        lHeight: '100%',
        inputWidth: '458px',
        textDescriptionSize: TypographySizes.md,
    },
    Tablet: {
        width: '727px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        paddingY: '16px 0 32px 0',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '404px',
        textDescriptionSize: TypographySizes.sm,
    },
    Mobile: {
        width: '328px',
        height: '80px',
        size: 'sm',
        mbText: '16px',
        paddingY: '16px 0 32px 0',
        fSize: '24px',
        lHeight: '133%',
        inputWidth: '284px',
        textDescriptionSize: TypographySizes.sm,
    },
};

interface FoodSearchCardProps {
    title: string;
    description?: string;
}

export const SearchBlock = (props: FoodSearchCardProps) => {
    const { title, description } = props;

    const { screenSize, isDesktop, isLaptop } = useScreenSize();

    return (
        <Flex
            width={Sizes[screenSize].width}
            flexDirection='column'
            padding={Sizes[screenSize].paddingY}
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
                    <Typography
                        Size={Sizes[screenSize].textDescriptionSize}
                        width={isDesktop || isLaptop ? '696px' : '100%'}
                        color='rgba(0, 0, 0, 0.48)'
                        textAlign='center'
                    >
                        {description}
                    </Typography>
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
                        <Typography Size={TypographySizes.md}>Исключить мои аллергены</Typography>
                        <Switch size='md' />
                    </Flex>
                    <Select width='234px' placeholder='Выберите из списка...'></Select>
                </Flex>
            )}
        </Flex>
    );
};
