import { Input } from '@chakra-ui/icons';
import { FieldErrors, UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

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
            data-test-id={DATA_TEST_IDS.recipeTitle}
            border={errors?.title?.message ? errorBorder : border}
            placeholder='Название рецепта'
            width='100%'
            size='lg'
            color='rgba(0, 0, 0, 0.92)'
            _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
        />
    );
};
