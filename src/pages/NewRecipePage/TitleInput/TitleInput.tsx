import { Input } from '@chakra-ui/icons';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipePageDataType } from '~/pages/NewRecipePage/NewRecipePage';

type TitleInputProps = {
    register: UseFormRegister<NewRecipePageDataType>;
};

export const TitleInput = (props: TitleInputProps) => {
    const { register } = props;

    return (
        <Input
            {...register('title', { required: true })}
            placeholder='Название рецепта'
            width='100%'
            size='lg'
            mb='24px'
        />
    );
};
