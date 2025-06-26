import { Image } from '@chakra-ui/icons';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Control, useFieldArray, UseFormGetValues, UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import { IngredientDataType } from '~/components/NewRecipeForm/Ingredients/Ingredients';
import { useUploadImageMutation } from '~/query/services/newRecipe';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { UploadImageModal } from '~/shared/ui/UploadImageModal/UploadImageModal';

import { NewRecipeDataType } from '../NewRecipeForm';
import { Step } from './Step';

export type StepType = {
    stepNumber: number;
    description: string;
    image?: string | null | undefined;
};

type StepsProps = {
    control: Control<NewRecipeDataType, IngredientDataType, NewRecipeDataType>;
    register: UseFormRegister<NewRecipeDataType>;
    hasError: boolean;
    getValues: UseFormGetValues<NewRecipeDataType>;
};

export const Steps = ({ control, register, hasError, getValues }: StepsProps) => {
    const { isDesktopLaptop } = useScreenSize();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [stepId, setStepId] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [uploadImage] = useUploadImageMutation();

    const { fields, append, remove, update, replace } = useFieldArray({
        control,
        name: 'steps',
    });

    const updateStepField = (index: number, fieldName: keyof StepType, value: string) => {
        update(index, {
            ...getValues(`steps.${index}`),
            [fieldName]: value,
        });
    };

    useEffect(() => {
        if (stepId !== null) {
            setPreviewImage((fields[stepId].image as string) || null);
        }
    }, [stepId]);

    const addStep = () => {
        append({ description: '', image: '', stepNumber: fields.length + 1 });
    };

    const onRemoveStepHandler = (index: number) => {
        remove(index);
        const updatedSteps = getValues('steps').map((step, i) => ({
            ...step,
            stepNumber: i + 1,
        }));

        replace(updatedSteps);
    };

    const onSaveHandle = async (imageFile: File) => {
        if (stepId === null) return;
        try {
            onClose();
            const formData = new FormData();
            formData.append('file', imageFile);

            const result = await uploadImage(formData).unwrap();
            updateStepField(stepId, 'image', result.url);
            setPreviewImage(null);

            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    const onDeleteHandle = () => {
        if (stepId === null) return;
        updateStepField(stepId, 'image', '');
    };

    const mappedSteps = fields?.map((field, index) => {
        const isLast = index === fields.length - 1;

        const onOpenHandler = () => {
            setStepId(index);
            onOpen();
        };

        return (
            <Step
                key={field.id}
                isLast={isLast}
                hasError={hasError}
                stepNumber={field.stepNumber}
                index={index}
                remove={onRemoveStepHandler}
                register={register}
                onOpenHandler={onOpenHandler}
                preview={fields?.[index]?.image || ''}
            />
        );
    });

    return (
        <Flex width={{ base: '100%', md: '604px', xl: '658px' }} flexDirection='column' gap='16px'>
            <Typography
                fontWeight='600'
                Size={isDesktopLaptop ? TypographySizes.md : TypographySizes.sm}
            >
                Добавьте шаги приготовления
            </Typography>
            {mappedSteps}
            <Flex width='100%' justifyContent='flex-end'>
                <Button
                    onClick={addStep}
                    border='1px solid rgba(0, 0, 0, 0.48)'
                    borderRadius='6px'
                    padding='0px 12px'
                    variant='outlined'
                    rightIcon={<Image width='14px' height='14px' src={BlackPlusIcon} />}
                >
                    Новый шаг
                </Button>
            </Flex>
            <UploadImageModal
                dataTestId={`recipe-steps-image-block-${stepId}-input-file`}
                image={previewImage ? getImageUrl(previewImage) : undefined}
                onDeleteHandle={onDeleteHandle}
                isOpen={isOpen}
                onClose={onClose}
                onSaveHandle={onSaveHandle}
            />
        </Flex>
    );
};
