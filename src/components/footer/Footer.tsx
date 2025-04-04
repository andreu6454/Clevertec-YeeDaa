import { Avatar, Box, IconButton, Image } from '@chakra-ui/icons';

import FooterButton from '~/components/footer/FooterButton';

import AvatarIcon from '../../assets/AvatarMobile.png';
import EditIcon from '../../assets/EditIcon.svg';
import HomeIcon from '../../assets/HomeIcon.svg';
import SearchIcon from '../../assets/SearchIcon.svg';

const Footer = () => (
    <footer data-test-id='footer'>
        <Box
            display='flex'
            alignItems='center'
            justifyContent='space-evenly'
            position='absolute'
            bottom={0}
            left={0}
            width='100%'
            height='84px'
            backgroundColor='#ffffd3'
        >
            <FooterButton
                isActive={true}
                title='Главная'
                icon={
                    <IconButton variant='ghost' aria-label='Главная'>
                        <Image marginY='4px' src={HomeIcon} />
                    </IconButton>
                }
            />
            <FooterButton title='Поиск' icon={<Image src={SearchIcon} />} />
            <FooterButton title='Записать' icon={<Image src={EditIcon} />} />
            <FooterButton
                title='Мой профиль'
                icon={<Avatar marginY='4px' boxSize='40px' src={AvatarIcon} />}
            />
        </Box>
    </footer>
);

export default Footer;
