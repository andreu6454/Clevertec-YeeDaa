import { Box } from '@chakra-ui/icons';
import { Accordion, Flex, Image, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useLocation } from 'react-router';

import LeaveIcon from '~/assets/svg/leaveIcon.svg';
import { navBarData } from '~/shared/data/navBarData';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { NavbarItem } from '~/widgets/navbar/NavbarItem/NavbarItem';

export const NavbarData = memo(() => {
    const location = useLocation();

    const { isDesktopLaptop, isTablet } = useScreenSize();

    const accordionHeight = isTablet ? '600px' : '460px';

    let index;
    const path = location.pathname.split('/')[1];

    const mappedItems = navBarData.map((el, ind) => {
        if (path === el.general) {
            index = ind;
        }

        return (
            <NavbarItem
                isDesktopLaptop={isDesktopLaptop}
                key={el.title}
                title={el.title}
                icon={el.icon}
                general={el.general}
                links={el.links}
            />
        );
    });

    return (
        <Flex direction='column' height='100%' justifyContent='space-between' overflowY='hidden'>
            <Accordion
                data-test-id='nav'
                height={isDesktopLaptop ? '' : accordionHeight}
                defaultIndex={index}
                display='flex'
                flexDirection='column'
                alignItems='center'
                width={isDesktopLaptop ? '256px' : '344px'}
                overflowY='scroll'
            >
                {mappedItems}
            </Accordion>
            <Box
                width={isDesktopLaptop ? '256px' : '344px'}
                height={isDesktopLaptop ? '144px' : '96px'}
                marginBottom='32px'
                gap='16px'
                display='flex'
                flexDirection='column'
                alignItems='center'
            >
                <Text
                    width={isDesktopLaptop ? '208px' : '296px'}
                    fontWeight='500'
                    fontSize='12px'
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.24)'
                >
                    Версия программы 03.25
                </Text>
                <Text
                    width={isDesktopLaptop ? '208px' : '296px'}
                    fontWeight='400'
                    fontSize='12px'
                    lineHeight='133%'
                    color='rgba(0, 0, 0, 0.64)'
                    whiteSpace='pre-line'
                >
                    {isDesktopLaptop
                        ? `Все права защищены, 
                    ученический файл, 
                    ©Клевер Технолоджи, 2025`
                        : 'Все права защищены, ученический файл, ©Клевер Технолоджи, 2025'}
                </Text>
                {isDesktopLaptop && (
                    <Box width='208px' display=' flex'>
                        <Image marginRight='6px' src={LeaveIcon} />
                        <Text fontWeight='600' fontSize='12px' lineHeight=' 133%' color='#000'>
                            Выйти
                        </Text>
                    </Box>
                )}
            </Box>
        </Flex>
    );
});
