import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

import SaveNote from '~/assets/svg/saveNote.svg';
import { CategoriesSelector } from '~/pages/NewRecipePage/CategoriesSelector/CategoriesSelector';
import { CookingTime } from '~/pages/NewRecipePage/CookingTime/CookingTime';
import { DescriptionTextArea } from '~/pages/NewRecipePage/DescriptionTextArea/DescriptionTextArea';
import { ImageUploader } from '~/pages/NewRecipePage/ImageUploader/ImageUploader';
import { Portions } from '~/pages/NewRecipePage/Portions/Portions';
import { Steps, StepType } from '~/pages/NewRecipePage/Steps/Steps';
import { TitleInput } from '~/pages/NewRecipePage/TitleInput/TitleInput';

import { IngredientDataType, Ingredients } from './Ingredients/Ingredients';

export type NewRecipePageDataType = {
    title: string;
    description: string;
    time: number;
    categoriesIds: Array<string>;
    portions: number;
    image: string;
    steps: StepType[];
    ingredients: IngredientDataType[];
};

export const NewRecipePage = () => {
    const { control, register, handleSubmit } = useForm<NewRecipePageDataType>({
        defaultValues: {
            steps: [{ stepNumber: 1, image: '', description: '' }],
            ingredients: [{ title: '', count: 0, measureUnit: '' }],
            time: 30,
            portions: 4,
        },
    });

    const onSubmit = handleSubmit((data: NewRecipePageDataType) => {
        console.log(data);
    });

    return (
        <form>
            <Flex direction='column' paddingTop='56px' width='100%' alignItems='center' gap='40px'>
                <Flex gap='24px'>
                    <ImageUploader />
                    <Flex direction='column' width='575px'>
                        <CategoriesSelector />
                        <TitleInput register={register} />
                        <DescriptionTextArea register={register} />
                        <Portions register={register} />
                        <CookingTime register={register} />
                    </Flex>
                </Flex>
                <Ingredients control={control} register={register} />
                <Steps control={control} register={register} />
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
                    <Button
                        type='submit'
                        onClick={onSubmit}
                        size='lg'
                        backgroundColor='#000'
                        color='#fff'
                    >
                        Опубликовать рецепт
                    </Button>
                </Flex>
            </Flex>
        </form>
    );
};
