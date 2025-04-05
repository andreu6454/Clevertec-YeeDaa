import { IconButton, Input, InputGroup, Select, Switch } from '@chakra-ui/icons';
import { Flex, Image, InputRightElement, Text } from '@chakra-ui/react';

import SearchFilterIcon from '../../assets/searchFilters.svg';
import SearchIcon from '../../assets/searchIcon.svg';

export const FoodSearchCard = () => (
    <Flex width='898px' height='248px' flexDirection='column' paddingTop='32px' alignItems='center'>
        <Text fontWeight='700' fontSize='48px' lineHeight='100%' textAlign='center' mb='32px'>
            Приятного аппетита!
        </Text>
        <Flex gap='12px' marginBottom='12px'>
            <IconButton
                borderColor='rgba(0, 0, 0, 0.48)'
                size='lg'
                variant='outline'
                aria-label='filter'
            >
                <Image src={SearchFilterIcon} />
            </IconButton>
            <InputGroup borderColor='rgba(0, 0, 0, 0.48)' width='458px'>
                <Input
                    color='black'
                    size='lg'
                    placeholder='Название или ингредиент...'
                    _placeholder={{ color: '#134b00' }}
                />
                <InputRightElement width='48px' height='48px'>
                    <IconButton variant='ghost' size='lg' aria-label='search'>
                        <Image width='31px' height='31px' src={SearchIcon} />
                    </IconButton>
                </InputRightElement>
            </InputGroup>
        </Flex>
        <Flex width='518px' gap='16px'>
            <Flex padding='6px 0 6px 8px' gap='12px' alignItems='center'>
                <Text fontWeight='500' fontSize='16px' lineHeight='150%'>
                    Исключить мои аллергены
                </Text>
                <Switch size='md' />
            </Flex>
            <Select width='234px' placeholder='Выберите из списка...'></Select>
        </Flex>
    </Flex>
);
