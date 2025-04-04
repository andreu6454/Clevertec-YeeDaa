import { Box } from '@chakra-ui/icons';
import { Image, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { NavbarItem } from '~/components/navbar/NavbarItem/NavbarItem';

import ChildrensIcon from '../../assets/childrens.svg';
import DessertsIcon from '../../assets/desserts.svg';
import DrinksIcon from '../../assets/drinks.svg';
import FirstCoursesIcon from '../../assets/firstCourses.svg';
import GrilledIcon from '../../assets/grilled.svg';
import LeaveIcon from '../../assets/leaveIcon.svg';
import NationalIcon from '../../assets/national.svg';
import PreparationsIcon from '../../assets/preparations.svg';
import SaladsIcon from '../../assets/salads.svg';
import SaucesIcon from '../../assets/sauces.svg';
import SecondCoursesIcon from '../../assets/secondCourses.svg';
import SnacksIcon from '../../assets/snacks.svg';
import TherapeuticNutritionIcon from '../../assets/therapeuticNutrition.svg';
import VeganCuisineIcon from '../../assets/veganCuisine.svg';

export const Navbar = memo(() => {
    const navBarItems = [
        { icon: SaladsIcon, title: 'Салаты' },
        { icon: SnacksIcon, title: 'Закуски' },
        { icon: FirstCoursesIcon, title: 'Первые блюда' },
        { icon: SecondCoursesIcon, title: 'Вторые блюда' },
        { icon: DessertsIcon, title: 'Десерты, выпечка' },
        { icon: GrilledIcon, title: 'Блюда на гриле' },
        { icon: VeganCuisineIcon, title: 'Веганская кухня' },
        { icon: ChildrensIcon, title: 'Детские блюда' },
        { icon: TherapeuticNutritionIcon, title: 'Лечебное питание' },
        { icon: NationalIcon, title: 'Национальные' },
        { icon: SaucesIcon, title: 'Соусы' },
        { icon: DrinksIcon, title: 'Напитки' },
        { icon: PreparationsIcon, title: 'Заготовки' },
    ];

    const mappedItems = navBarItems.map((el) => (
        <NavbarItem key={el.title} title={el.title} icon={el.icon} />
    ));

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
