import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import SaveNote from '~/assets/svg/saveNote.svg';
import { CategoriesSelector } from '~/pages/NewRecipePage/CategoriesSelector/CategoriesSelector';
import { CookingTime } from '~/pages/NewRecipePage/CookingTime/CookingTime';
import { DescriptionTextArea } from '~/pages/NewRecipePage/DescriptionTextArea/DescriptionTextArea';
import { ImageUploader } from '~/pages/NewRecipePage/ImageUploader/ImageUploader';
import { Portions } from '~/pages/NewRecipePage/Portions/Portions';
import { Steps, StepType } from '~/pages/NewRecipePage/Steps/Steps';
import { TitleInput } from '~/pages/NewRecipePage/TitleInput/TitleInput';
import { newRecipeSchema } from '~/shared/types/validationSchemas/newRecipeSchema';

import { IngredientDataType, Ingredients } from './Ingredients/Ingredients';

export type NewRecipeDataType = {
    title: string;
    description: string;
    time: number;
    categoriesIds: string[];
    portions: number;
    image: string;
    steps: StepType[];
    ingredients: IngredientDataType[];
};

export const NewRecipePage = () => {
    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<NewRecipeDataType>({
        defaultValues: {
            steps: [{ stepNumber: 1, image: '', description: '' }],
            ingredients: [{ title: '', count: 0, measureUnit: '' }],
            time: 30,
            portions: 4,
            categoriesIds: [],
        },
        resolver: zodResolver(newRecipeSchema),
    });

    // const [crateRecipe] = useCreateRecipeMutation()

    const onSubmit = handleSubmit((data: NewRecipeDataType) => {
        const formData = {
            ...data,
            ingredients: data.ingredients.slice(0, -1),
        };
        //
        // try {
        //
        // } catch (e) {
        //
        // }

        console.log(formData);
    });

    return (
        <form>
            <Flex
                direction='column'
                paddingTop={{ base: '16px', xl: '56px' }}
                paddingBottom={{ base: '16px', xl: '32px' }}
                width='100%'
                alignItems='center'
                gap={{ base: '32px', xl: '40px' }}
            >
                <Flex flexDirection={{ base: 'column', md: 'row' }} gap='24px'>
                    <ImageUploader setValue={setValue} getValues={getValues} errors={errors} />
                    <Flex direction='column' width='100%' gap={{ base: '16px', xl: '32px' }}>
                        <CategoriesSelector
                            control={control}
                            setValue={setValue}
                            getValues={getValues}
                            errors={errors}
                        />
                        <TitleInput register={register} errors={errors} />
                        <DescriptionTextArea register={register} errors={errors} />
                        <Portions register={register} />
                        <CookingTime register={register} />
                    </Flex>
                </Flex>
                <Ingredients control={control} register={register} errors={errors} />
                <Steps control={control} register={register} errors={errors} />
                <Flex
                    gap='20px'
                    width='100%'
                    justifyContent='center'
                    flexDirection={{ base: 'column', md: 'row' }}
                >
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
