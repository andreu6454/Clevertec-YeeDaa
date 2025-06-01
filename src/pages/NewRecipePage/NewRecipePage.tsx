import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';

import SaveNote from '~/assets/svg/saveNote.svg';
import { FullScreenSpinner } from '~/components/FullScreenSpinner/FullScreenSpinner';
import { CategoriesSelector } from '~/pages/NewRecipePage/CategoriesSelector/CategoriesSelector';
import { CookingTime } from '~/pages/NewRecipePage/CookingTime/CookingTime';
import { DescriptionTextArea } from '~/pages/NewRecipePage/DescriptionTextArea/DescriptionTextArea';
import { ImageUploader } from '~/pages/NewRecipePage/ImageUploader/ImageUploader';
import { Portions } from '~/pages/NewRecipePage/Portions/Portions';
import { RecipeSaveModal } from '~/pages/NewRecipePage/RecipeSaveDraftModal/RecipeSaveModal';
import { Steps, StepType } from '~/pages/NewRecipePage/Steps/Steps';
import { TitleInput } from '~/pages/NewRecipePage/TitleInput/TitleInput';
import {
    useCreateDraftMutation,
    useCreateRecipeMutation,
    useGetMeasureUnitsQuery,
    useUpdateRecipeMutation,
} from '~/query/services/newRecipe';
import { ErrorResponse } from '~/query/types/types';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { useBlockerWithModal } from '~/shared/hooks/useBrokerWithModal';
import { getNavigateLinkToRecipe } from '~/shared/services/getNavigateLinkToRecipe';
import { Recipe } from '~/shared/types/recipeTypes';
import { newRecipeSchema } from '~/shared/types/validationSchemas/newRecipeSchema';
import { checkFormErrors } from '~/shared/utils/checkFormErrors';
import { replaceEmptyStringsWithNull } from '~/shared/utils/replaceEmptyStringsWithNull';
import { categoriesSelector, subCategoriesSelector } from '~/store/categories-slice';
import { useAppSelector } from '~/store/hooks';
import { recipeSelector } from '~/store/recipe-slice';

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

    const { pathname } = useLocation();
    const isNewRecipePage = pathname === APP_PATHS.newRecipe;
    const recipe = useAppSelector(recipeSelector);

    const [crateRecipe, { isSuccess: isSuccessCreateRecipe }] = useCreateRecipeMutation();
    const [createDraft, { isSuccess: isSuccessCreateDraft }] = useCreateDraftMutation();
    const [updateRecipe, { isSuccess: isSuccessUpdateRecipe }] = useUpdateRecipeMutation();
    const { isLoading } = useGetMeasureUnitsQuery();

    const [isRedirectBlocked, setIsRedirectBlocked] = useState<boolean>(false);
    const isSuccess = isSuccessCreateRecipe || isSuccessCreateDraft || isSuccessUpdateRecipe;

    const navigate = useNavigate();
    const categories = useAppSelector(categoriesSelector);
    const subCategories = useAppSelector(subCategoriesSelector);

    const { isOpen, onClose, continueNavigation, cancelNavigation } =
        useBlockerWithModal(isRedirectBlocked);

    const errorAlert = useAlertToast();

    useEffect(() => {
        if (Object.keys(dirtyFields).length && !isSuccess) {
            setIsRedirectBlocked(true);
        }
    }, [dirtyFields]);

    const onSubmit = handleSubmit(async (data: NewRecipeDataType) => {
        const finalData = replaceEmptyStringsWithNull(data);

        try {
            let result = {} as Recipe;
            setIsRedirectBlocked(false);

            if (isNewRecipePage) {
                result = await crateRecipe(finalData).unwrap();
            } else {
                const updateRecipeParams = { id: recipe._id, recipe: finalData };
                result = await updateRecipe(updateRecipeParams).unwrap();
            }

            continueNavigation();

            errorAlert(
                {
                    status: 'success',
                    title: 'Рецепт успешно опубликован',
                },
                false,
            );

            navigate(
                getNavigateLinkToRecipe(
                    categories,
                    subCategories,
                    result.categoriesIds[0],
                    result._id,
                ),
            );
            continueNavigation();
        } catch (error) {
            setIsRedirectBlocked(true);
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                errorAlert(
                    {
                        status: 'error',
                        title: 'Ошибка сервера',
                        description: 'Попробуйте пока сохранить в черновик.',
                    },
                    false,
                );
            }
            if (responseError?.status === 409) {
                errorAlert(
                    {
                        status: 'error',
                        title: 'Ошибка',
                        description: 'Рецепт с таким названием уже существует',
                    },
                    false,
                );
            }
        }
    });

    const onSaveHandler = async () => {
        onClose();
        clearErrors();
        const isValid = await trigger('title');

        if (!isValid) return;

        const finalData = replaceEmptyStringsWithNull(getValues());

        try {
            setIsRedirectBlocked(false);
            await createDraft(finalData).unwrap();
            navigate(APP_PATHS.root);

            errorAlert(
                {
                    status: 'success',
                    title: 'Черновик успешно сохранен',
                },
                false,
            );
        } catch (error) {
            setIsRedirectBlocked(true);
            const responseError = error as ErrorResponse;
            if (responseError?.status === 500) {
                errorAlert(
                    {
                        status: 'error',
                        title: 'Ошибка сервера',
                        description: 'Не удалось сохранить черновик рецепта',
                    },
                    false,
                );
            }
            if (responseError?.status === 409) {
                errorAlert(
                    {
                        status: 'error',
                        title: 'Ошибка',
                        description: 'Рецепт с таким названием уже существует',
                    },
                    false,
                );
            }
        }
    };

    useEffect(() => {
        const recipeForReset = {
            ...recipe,
            time: Number(recipe.time),
        };
        if (!isNewRecipePage && recipe && !isLoading) {
            reset(recipeForReset);
        }
    }, [isNewRecipePage, recipe, reset, isLoading]);

    if (isLoading) {
        return <FullScreenSpinner />;
    }
    return (
        <form data-test-id={DATA_TEST_IDS.recipeForm} onSubmit={onSubmit}>
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
                        onClick={onSubmit}
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
