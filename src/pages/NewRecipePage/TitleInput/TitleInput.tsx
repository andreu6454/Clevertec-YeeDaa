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
    const border = '1px solid #d7ff94';

    return (
        <Input
            {...register('title', { required: true })}
            border={errors?.title?.message ? errorBorder : border}
            placeholder='Название рецепта'
            width='100%'
            size='lg'
            color='rgba(0, 0, 0, 0.92)'
            _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
        />
    );
};
