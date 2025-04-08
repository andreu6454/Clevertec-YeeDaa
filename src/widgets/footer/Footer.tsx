import { Avatar, Box, IconButton } from '@chakra-ui/icons';

import FooterButton from '~/widgets/footer/FooterButton/FooterButton';
import { FooterIcon } from '~/widgets/footer/FooterIcon/FooterIcon';

import AvatarIcon from '../../assets/AvatarMobile.png';
import EditIcon from '../../assets/svg/EditIcon.svg';
import HomeIcon from '../../assets/svg/HomeIcon.svg';
import SearchIcon from '../../assets/svg/searchIcon.svg';

const Footer = () => (
    <footer data-test-id='footer'>
        <Box
            display='flex'
            alignItems='center'
            justifyContent='space-evenly'
            position='fixed'
            bottom={0}
            left={0}
            width='100%'
            height='84px'
            backgroundColor='#ffffd3'
        >
            <FooterButton
                isActive={true}
                title='Главная'
                icon={<FooterIcon marginY='4px' image={HomeIcon} />}
            />
            <FooterButton title='Поиск' icon={<FooterIcon marginY='4px' image={SearchIcon} />} />
            <FooterButton title='Записать' icon={<FooterIcon marginY='4px' image={EditIcon} />} />
            <FooterButton
                title='Мой профиль'
                icon={
                    <IconButton variant='ghost' aria-label='Главная'>
                        <Avatar marginY='4px' boxSize='40px' src={AvatarIcon} />
                    </IconButton>
                }
            />
        </Box>
    </footer>
);

export default Footer;
