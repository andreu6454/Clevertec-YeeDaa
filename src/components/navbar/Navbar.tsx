import { Box } from '@chakra-ui/icons';
import { Image, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { NavbarItem } from '~/components/navbar/NavbarItem/NavbarItem';
import { navBarItems } from '~/shared/data/nav-items';

import LeaveIcon from '../../assets/svg/leaveIcon.svg';

export const Navbar = memo(() => {
    const mappedItems = navBarItems.map((el) => {
        if (el.title === 'Веганская кухня') {
            return (
                <NavbarItem
                    data-test-id='vegan-cuisine'
                    key={el.title}
                    title={el.title}
                    icon={el.icon}
                />
            );
        }
        return <NavbarItem key={el.title} title={el.title} icon={el.icon} />;
    });

    return (
        <Box
            overflowY='scroll'
            display='flex'
            flexDirection='column'
            alignItems='center'
            position='fixed'
            left='0'
            top='80px'
            height='calc(100% - 80px)'
            width='256px'
            paddingTop='24px'
        >
            <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                minHeight='644px'
                width='256px'
            >
                {mappedItems}
            </Box>
            <Box
                width='256px'
                height='144px'
                paddingBottom='32px'
                gap='16px'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Text
                    width='208px'
                    fontWeight='500'
                    fontSize='12px'
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.24)'
                >
                    Версия программы 03.25
                </Text>
                <Text
                    width='208px'
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.64)'
                    whiteSpace='pre-line'
                >
                    {`Все права защищены, 
                    ученический файл, 
                    ©Клевер Технолоджи, 2025`}
                </Text>
                <Box width='208px' display=' flex'>
                    <Image marginRight='6px' src={LeaveIcon} />
                    <Text fontWeight='600' fontSize='12px' lineHeight=' 133%' color='#000'>
                        Выйти
                    </Text>
                </Box>
            </Box>
        </Box>
    );
});
