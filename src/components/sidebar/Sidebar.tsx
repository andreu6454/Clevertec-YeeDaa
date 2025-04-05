import { IconButton } from '@chakra-ui/icons';
import { Flex, Image, Text } from '@chakra-ui/react';

import { ReactionsBar } from '~/components/ReactionsBar/ReactionsBar';

import NoteIcon from '../../assets/svg/noteIcon.svg';

export const Sidebar = () => (
    <Flex
        position='fixed'
        right='0'
        top='80px'
        height='calc(100% - 80px)'
        width='208px'
        flexDirection='column'
        alignItems='center'
        justifyContent='space-between'
    >
        <ReactionsBar />
        <Flex
            width='208px'
            height='208px'
            sx={{
                background:
                    'radial-gradient(50% 50% at 50% 50%, #c4ff61 0%, rgba(255, 255, 255, 0) 100%)',
            }}
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            gap='12px'
        >
            <IconButton size='lg' rounded='50%' variant='solid' aria-label='note'>
                <Image src={NoteIcon} />
            </IconButton>
            <Text
                fontWeight='400'
                fontSize='12px'
                lineHeight='133%'
                textAlign='center'
                color='rgba(0, 0, 0, 0.64)'
            >
                Записать рецепт
            </Text>
        </Flex>
    </Flex>
);
