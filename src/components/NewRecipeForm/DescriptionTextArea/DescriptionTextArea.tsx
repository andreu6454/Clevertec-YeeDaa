import { Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

import { NewRecipeDataType } from '../NewRecipeForm';

type DescriptionTextAreaProps = {
    register: UseFormRegister<NewRecipeDataType>;
    hasError: boolean;
};

export const DescriptionTextArea = ({ register, hasError }: DescriptionTextAreaProps) => {
    const errorBorder = '2px solid #e53e3e';
    const border = '1px solid #e2e8f0';

    return (
        <Textarea
            {...register('description', { required: true })}
            data-test-id={DATA_TEST_IDS.recipeDescription}
            border={hasError ? errorBorder : border}
            borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
            width='100%'
            height='80px'
            placeholder='Краткое описание рецепта'
            color='rgba(0, 0, 0, 0.92)'
            _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
            _focus={{ borderColor: hasError ? 'rgb(229, 62, 62)' : 'rgb(49, 130, 206)' }}
        />
    );
};
