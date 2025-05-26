import { ChevronDownIcon, IconButton, Image, Input, Menu, MenuList } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import PlusIcon from '~/assets/svg/plusIcon.svg';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const Ingredients = () => (
    <Flex width='658px' flexDirection='column' gap='16px'>
        <Flex gap='8px' alignItems='center'>
            <Typography fontWeight='600' Size={TypographySizes.md}>
                Добавьте ингредиенты рецепта, нажав на
            </Typography>
            <Image src={PlusIcon} width='16px' height='16px' />
        </Flex>

        <Flex>
            <Typography
                width='295px'
                padding='4px 24px'
                color='#2db100'
                fontWeight={700}
                letterSpacing='0.05em'
                Size={TypographySizes.xs}
            >
                Ингредиент
            </Typography>
            <Typography
                width='125px'
                padding='4px 0'
                textAlign='center'
                color='#2db100'
                fontWeight={700}
                letterSpacing='0.05em'
                Size={TypographySizes.xs}
            >
                Количество
            </Typography>
            <Typography
                width='203px'
                padding='4px 0'
                textAlign='center'
                color='#2db100'
                fontWeight={700}
                letterSpacing='0.05em'
                Size={TypographySizes.xs}
            >
                Единица измерения
            </Typography>
        </Flex>
        <Flex alignItems='center' gap='12px'>
            <Input size='md' width='295px' placeholder='Ингредиент' />
            <Input type='number' size='md' width='80px' placeholder='100' />
            <Menu>
                <MenuButton
                    border='1px solid rgba(0, 0, 0, 0.08)'
                    borderRadius='6px'
                    textAlign='start'
                    padding='10px 16px'
                    variant='outlined'
                    justifyContent='space-between'
                    width='215px'
                    minHeight='40px'
                    height='max-content'
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                >
                    Единица изменрен...
                </MenuButton>
                <MenuList></MenuList>
            </Menu>
            <IconButton
                width='32px'
                height='32px'
                variant='ghost'
                aria-label='add ingredient'
                icon={<Image src={BlackPlusIcon} />}
            />
        </Flex>
    </Flex>
);
