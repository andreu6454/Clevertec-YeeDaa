import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';

import SaveNote from '~/assets/svg/saveNote.svg';
import { CategoriesSelector } from '~/pages/NewRecipePage/CategoriesSelector/CategoriesSelector';
import { CookingTime } from '~/pages/NewRecipePage/CookingTime/CookingTime';
import { DescriptionTextArea } from '~/pages/NewRecipePage/DescriptionTextArea/DescriptionTextArea';
import { ImageUploader } from '~/pages/NewRecipePage/ImageUploader/ImageUploader';
import { Portions } from '~/pages/NewRecipePage/Portions/Portions';
import { Steps } from '~/pages/NewRecipePage/Steps/Steps';
import { NewRecipeTitleInput } from '~/pages/NewRecipePage/TitleInput/NewRecipeTitleInput';

import { Ingredients } from './Ingredients/Ingredients';

export const NewRecipePage = () => (
    <Flex direction='column' paddingTop='56px' width='100%' alignItems='center' gap='40px'>
        <Flex gap='24px'>
            <ImageUploader />
            <Flex direction='column' width='575px'>
                <CategoriesSelector />
                <NewRecipeTitleInput />
                <DescriptionTextArea />
                <Portions />
                <CookingTime />
            </Flex>
        </Flex>
        <Ingredients />
        <Steps />
        <Flex gap='20px' justifyContent='center'>
            <Button
                size='lg'
                border='1px solid rgba(0, 0, 0, 0.48)'
                borderRadius='6px'
                variant='outlined'
                leftIcon={<Image width='16px' height='16px' src={SaveNote} />}
            >
                Сохранить черновик
            </Button>
            <Button size='lg' backgroundColor='#000' color='#fff'>
                Опубликовать рецепт
            </Button>
        </Flex>
    </Flex>
);
