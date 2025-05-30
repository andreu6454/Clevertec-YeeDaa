import { Textarea } from '@chakra-ui/react';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';

type DescriptionTextAreaProps = {
    register: UseFormRegister<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
};

export const DescriptionTextArea = (props: DescriptionTextAreaProps) => {
    const { register, errors } = props;

    const errorBorder = '2px solid #e53e3e';

    return (
        <Textarea
            {...register('description', { required: true })}
            border={errors?.description?.message && errorBorder}
            width='100%'
            height='80px'
            placeholder='Краткое описание рецепта'
            color='rgba(0, 0, 0, 0.92)'
            _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
        />
    );
};
