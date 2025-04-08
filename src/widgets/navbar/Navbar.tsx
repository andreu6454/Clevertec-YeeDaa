import { Box } from '@chakra-ui/icons';
import { Accordion, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useLocation } from 'react-router';

import { NavBarData } from '~/shared/data/navBarData';
import { NavbarItem } from '~/widgets/navbar/NavbarItem/NavbarItem';

import LeaveIcon from '../../assets/svg/leaveIcon.svg';

export const Navbar = memo(() => {
    const location = useLocation();

    let index;
    const path = location.pathname.split('/')[1];

    const mappedItems = NavBarData.map((el, ind) => {
        if (path === el.general) {
            index = ind;
        }

        return (
            <NavbarItem
                key={el.title}
                title={el.title}
                icon={el.icon}
                general={el.general}
                links={el.links}
            />
        );
    });

    return (
        <Box
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
            <Accordion
                defaultIndex={index}
                display='flex'
                flexDirection='column'
                alignItems='center'
                width='256px'
                overflowY='scroll'
            >
                {mappedItems}
            </Accordion>
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
