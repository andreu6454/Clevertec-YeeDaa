import { Input } from '@chakra-ui/icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';

type TitleInputProps = {
    register: UseFormRegister<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
};

export const TitleInput = (props: TitleInputProps) => {
    const { register, errors } = props;

    const errorBorder = '2px solid #e53e3e';

    return (
        <Input
            {...register('title', { required: true })}
            border={errors?.title?.message && errorBorder}
            placeholder='Название рецепта'
            width='100%'
            size='lg'
            borderColor='#d7ff94'
            color='rgba(0, 0, 0, 0.64)'
        />
    );
};
