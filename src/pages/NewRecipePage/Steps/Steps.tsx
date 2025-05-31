import { Image } from '@chakra-ui/icons';
import { Button, Flex, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Control, FieldErrors, useFieldArray, UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import { IngredientDataType } from '~/pages/NewRecipePage/Ingredients/Ingredients';
import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { UploadImageModal } from '~/shared/ui/UploadImageModal/UploadImageModal';

import { Step } from './Step';

export type StepType = {
    stepNumber: number;
    description: string;
    image?: string | undefined;
};

type StepsProps = {
    control: Control<NewRecipeDataType, IngredientDataType, NewRecipeDataType>;
    register: UseFormRegister<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
};

export const Steps = (props: StepsProps) => {
    const { control, register, errors } = props;
    const { isDesktopLaptop } = useScreenSize();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [stepId, setStepId] = useState<number | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'steps',
    });

    const updateStepField = (index: number, fieldName: keyof StepType, value: string) => {
        const step = fields[index];
        update(index, {
            ...step,
            [fieldName]: value,
        });
    };

    useEffect(() => {
        if (stepId) setPreviewImage(getImageUrl(fields[stepId]?.image as string));
    }, [stepId]);

    const addStep = () => {
        append({ description: '', image: '', stepNumber: fields.length + 1 });
    };

    const onRemoveHandler = (index: number) => {
        remove(index);
    };

    const onSaveHandle = (url: string) => {
        if (stepId === null) return;
        updateStepField(stepId, 'image', url);
    };

    const onDeleteHandle = () => {
        if (stepId === null) return;
        updateStepField(stepId, 'image', '');
    };

    const mappedSteps = fields.map((field, index) => {
        const isLast = index === fields.length - 1;

        const onOpenHandler = () => {
            setStepId(index);
            onOpen();
        };

        return (
            <Step
                key={field.id}
                isLast={isLast}
                error={errors?.title?.message}
                stepNumber={field.stepNumber}
                index={index}
                remove={onRemoveHandler}
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
                image={previewImage}
                onDeleteHandle={onDeleteHandle}
                isOpen={isOpen}
                onClose={onClose}
                onSaveHandle={onSaveHandle}
            />
        </Flex>
    );
};
