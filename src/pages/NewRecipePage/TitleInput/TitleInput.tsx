import { Input } from '@chakra-ui/icons';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type TitleInputProps = {
    register: UseFormRegister<NewRecipeDataType>;
    hasError: boolean;
};

export const TitleInput = (props: TitleInputProps) => {
    const { register, hasError } = props;

    const errorBorder = '2px solid rgb(229, 62, 62)';
    const border = '1px solid #d7ff94';

    return (
        <Input
            {...register('title', { required: true })}
            data-test-id={DATA_TEST_IDS.recipeTitle}
            border={hasError ? errorBorder : border}
            borderColor={hasError ? 'rgb(229, 62, 62)' : ' #d7ff94'}
            placeholder='Название рецепта'
            width='100%'
            size='lg'
            color='rgba(0, 0, 0, 0.92)'
            _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
            _focus={{ borderColor: hasError ? 'rgb(229, 62, 62)' : 'rgb(49, 130, 206)' }}
        />
    );
};
