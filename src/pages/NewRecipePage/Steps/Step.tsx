import { Box, DeleteIcon, IconButton, Image } from '@chakra-ui/icons';
import { Flex, Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import UploadImage from '~/assets/uploadImageSmall.png';
import { NewRecipePageDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type StepProps = {
    image?: string;
    stepNumber: number;
    register: UseFormRegister<NewRecipePageDataType>;
    remove: (index: number) => void;
    index: number;
};

export const Step = (props: StepProps) => {
    const { stepNumber, image, register, index, remove } = props;

    return (
        <Flex border='1px solid rgba(0, 0, 0, 0.08)' height='160px' borderRadius='8px'>
            <Image width='346px' borderRadius='8px' src={image ? image : UploadImage} />
            <Flex flexDirection='column' padding='20px' gap='16px' width='100%'>
                <Flex alignItems='center' justifyContent='space-between' width='100%'>
                    <Box
                        padding='2px 8px'
                        backgroundColor='rgba(0, 0, 0, 0.06)'
                        borderRadius='4px'
                        width='max-content'
                    >
                        <Typography Size={TypographySizes.sm}>{`Шаг ${stepNumber}`}</Typography>
                    </Box>
                    <IconButton
                        aria-label='Удалить ингредиент'
                        icon={<DeleteIcon color='#2db100' />}
                        onClick={() => remove(index)}
                        colorScheme='red'
                        variant='ghost'
                    />
                </Flex>
                <Textarea
                    {...register(`steps.${index}.description` as const, {
                        required: 'Обязательное поле',
                        min: { value: 1, message: 'Минимальное значение 1' },
                    })}
                    placeholder='Шаг'
                    width='100%'
                    height='84px'
                />
            </Flex>
        </Flex>
    );
};
