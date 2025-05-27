import { Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipePageDataType } from '~/pages/NewRecipePage/NewRecipePage';

type DescriptionTextAreaProps = {
    register: UseFormRegister<NewRecipePageDataType>;
};

export const DescriptionTextArea = (props: DescriptionTextAreaProps) => {
    const { register } = props;

    return (
        <Textarea
            {...register('description', { required: true })}
            width='100%'
            height='80px'
            placeholder='Краткое описание рецепта'
            mb='24px'
        />
    );
};
