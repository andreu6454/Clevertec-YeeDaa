import { ChevronDownIcon, Menu, MenuList } from '@chakra-ui/icons';
import { Button, Flex, MenuButton } from '@chakra-ui/react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const CategoriesSelector = () => (
    <Flex height='48px' gap='24px' alignItems='center' mb='32px'>
        <Typography Size={TypographySizes.lg}>Выберите не менее 3-х тегов</Typography>
        <Menu>
            <MenuButton
                border='1px solid rgba(0, 0, 0, 0.08)'
                borderRadius='6px'
                textAlign='start'
                padding='10px 16px'
                variant='outlined'
                justifyContent='space-between'
                width='100%'
                minHeight='40px'
                height='max-content'
                as={Button}
                rightIcon={<ChevronDownIcon />}
            >
                Выберите из списка...
            </MenuButton>
            <MenuList></MenuList>
        </Menu>
    </Flex>
);
