import { Image } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { Control, useFieldArray, UseFormRegister } from 'react-hook-form';

import BlackPlusIcon from '~/assets/svg/blackPlusIcon.svg';
import { IngredientDataType } from '~/pages/NewRecipePage/Ingredients/Ingredients';
import { NewRecipePageDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

import { Step } from './Step';

export type StepType = {
    stepNumber: number;
    description: string;
    image: string;
};

type StepsProps = {
    control: Control<NewRecipePageDataType, IngredientDataType, NewRecipePageDataType>;
    register: UseFormRegister<NewRecipePageDataType>;
};

export const Steps = (props: StepsProps) => {
    const { control, register } = props;

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'steps',
    });

    const addStep = () => {
        append({ description: '', image: '', stepNumber: fields.length + 1 });
    };

    const onRemoveHandler = (index: number) => {
        remove(index);
    };

    const mappedSteps = fields.map((field, index) => (
        <Step
            key={field.id}
            stepNumber={field.stepNumber}
            index={index}
            remove={onRemoveHandler}
            register={register}
        />
    ));

    return (
        <Flex width='658px' flexDirection='column' gap='16px'>
            <Typography fontWeight='600' Size={TypographySizes.md}>
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
        </Flex>
    );
};
