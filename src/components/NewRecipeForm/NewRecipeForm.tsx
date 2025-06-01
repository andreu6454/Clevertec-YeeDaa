import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import SaveNote from '~/assets/svg/saveNote.svg';
import { CategoriesSelector } from '~/components/NewRecipeForm/CategoriesSelector/CategoriesSelector';
import { CookingTime } from '~/components/NewRecipeForm/CookingTime/CookingTime';
import { DescriptionTextArea } from '~/components/NewRecipeForm/DescriptionTextArea/DescriptionTextArea';
import { ImageUploader } from '~/components/NewRecipeForm/ImageUploader/ImageUploader';
import {
    IngredientDataType,
    Ingredients,
} from '~/components/NewRecipeForm/Ingredients/Ingredients';
import { Portions } from '~/components/NewRecipeForm/Portions/Portions';
import { RecipeSaveModal } from '~/components/NewRecipeForm/RecipeSaveDraftModal/RecipeSaveModal';
import { Steps, StepType } from '~/components/NewRecipeForm/Steps/Steps';
import { TitleInput } from '~/components/NewRecipeForm/TitleInput/TitleInput';
import { onSaveArgsType, onSubmitArgsType } from '~/pages/NewRecipePage/NewRecipePage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useBlockerWithModal } from '~/shared/hooks/useBrokerWithModal';
import { newRecipeSchema } from '~/shared/types/validationSchemas/newRecipeSchema';
import { checkFormErrors } from '~/shared/utils/checkFormErrors';
import { useAppSelector } from '~/store/hooks';
import { recipeSelector } from '~/store/recipe-slice';

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

type NewRecipeFormProps = {
    isLoading: boolean;
    isSuccess: boolean;
    isNewRecipePage: boolean;
    onSubmit: (args: onSubmitArgsType) => void;
    onSave: (args: onSaveArgsType) => void;
};

export const NewRecipeForm = (props: NewRecipeFormProps) => {
    const { isLoading, onSubmit, onSave, isSuccess, isNewRecipePage } = props;

    const {
        control,
        register,
        handleSubmit,
        setValue,
        getValues,
        clearErrors,
        trigger,
        reset,
        formState: { errors, dirtyFields },
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

    const [isRedirectBlocked, setIsRedirectBlocked] = useState<boolean>(false);
    const { isOpen, onClose, continueNavigation, cancelNavigation } =
        useBlockerWithModal(isRedirectBlocked);

    useEffect(() => {
        if (Object.keys(dirtyFields).length && !isSuccess) {
            setIsRedirectBlocked(true);
        }
    }, [dirtyFields]);

    const recipe = useAppSelector(recipeSelector);

    useEffect(() => {
        const recipeForReset = {
            ...recipe,
            time: Number(recipe.time),
        };
        if (!isNewRecipePage && recipe && !isLoading) {
            reset(recipeForReset);
        }
    }, [isNewRecipePage, recipe, reset, isLoading]);

    const onSubmitHandler = handleSubmit((data: NewRecipeDataType) => {
        const args: onSubmitArgsType = {
            data: data,
            recipeId: recipe._id,
            setIsRedirectBlocked: setIsRedirectBlocked,
            continueNavigation: continueNavigation,
        };
        onSubmit(args);
    });

    const onSaveHandler = async () => {
        onClose();
        clearErrors();
        const isValid = await trigger('title');

        const args: onSaveArgsType = {
            data: getValues(),
            isValid: isValid,
            setIsRedirectBlocked: setIsRedirectBlocked,
        };

        onSave(args);
    };
    return (
        <form data-test-id={DATA_TEST_IDS.recipeForm} onSubmit={onSubmitHandler}>
            <Flex
                direction='column'
                paddingTop={{ base: '16px', xl: '56px' }}
                paddingBottom={{ base: '16px', xl: '32px' }}
                width='100%'
                alignItems='center'
                gap={{ base: '32px', xl: '40px' }}
            >
                <Flex flexDirection={{ base: 'column', md: 'row' }} gap='24px'>
                    <ImageUploader
                        setValue={setValue}
                        getValues={getValues}
                        hasError={checkFormErrors(errors)}
                    />
                    <Flex direction='column' width='100%' gap={{ base: '16px', xl: '32px' }}>
                        <CategoriesSelector
                            hasError={checkFormErrors(errors)}
                            control={control}
                            setValue={setValue}
                            getValues={getValues}
                        />
                        <TitleInput hasError={checkFormErrors(errors)} register={register} />
                        <DescriptionTextArea
                            hasError={checkFormErrors(errors)}
                            register={register}
                        />
                        <Portions hasError={checkFormErrors(errors)} register={register} />
                        <CookingTime hasError={checkFormErrors(errors)} register={register} />
                    </Flex>
                </Flex>
                <Ingredients
                    setIsRedirectBlocked={setIsRedirectBlocked}
                    control={control}
                    register={register}
                    hasError={checkFormErrors(errors)}
                />
                <Steps
                    getValues={getValues}
                    control={control}
                    register={register}
                    hasError={checkFormErrors(errors)}
                />
                <Flex
                    gap='20px'
                    width='100%'
                    justifyContent='center'
                    flexDirection={{ base: 'column', md: 'row' }}
                >
                    <Button
                        data-test-id={DATA_TEST_IDS.recipeSaveDraft}
                        onClick={onSaveHandler}
                        size='lg'
                        border='1px solid rgba(0, 0, 0, 0.48)'
                        borderRadius='6px'
                        variant='outlined'
                        leftIcon={<Image width='16px' height='16px' src={SaveNote} />}
                    >
                        Сохранить черновик
                    </Button>
                    <Button
                        data-test-id={DATA_TEST_IDS.recipePublishButton}
                        type='submit'
                        onClick={onSubmitHandler}
                        size='lg'
                        backgroundColor='#000'
                        color='#fff'
                    >
                        Опубликовать рецепт
                    </Button>
                </Flex>
                <RecipeSaveModal
                    isOpen={isOpen}
                    onClose={cancelNavigation}
                    handleSaveRecipe={onSaveHandler}
                    continueNavigation={continueNavigation}
                />
            </Flex>
        </form>
    );
};
