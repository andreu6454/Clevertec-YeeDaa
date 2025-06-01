import { Box, DeleteIcon, IconButton, Image } from '@chakra-ui/icons';
import { Flex, Textarea } from '@chakra-ui/react';
import { UseFormRegister } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';

type StepProps = {
    stepNumber: number;
    register: UseFormRegister<NewRecipeDataType>;
    remove: (index: number) => void;
    index: number;
    onOpenHandler: () => void;
    preview: string;
    isLast?: boolean;
    hasError: boolean;
};

export const Step = (props: StepProps) => {
    const { stepNumber, register, index, remove, preview, onOpenHandler, hasError } = props;

    const errorBorder = '2px solid rgb(229, 62, 62)';
    const border = '1px solid #e2e8f0';

    return (
        <Flex
            border='1px solid rgba(0, 0, 0, 0.08)'
            height={{ base: '353px', md: '160px' }}
            borderRadius='8px'
            flexDirection={{ base: 'column', md: 'row' }}
        >
            {preview ? (
                <Image
                    data-test-id={`recipe-steps-image-block-${index}-preview-image`}
                    onClick={onOpenHandler}
                    width={{ base: '100%', md: '346px' }}
                    borderRadius='8px'
                    src={getImageUrl(preview)}
                />
            ) : (
                <UploadImage
                    dataTestId={`recipe-steps-image-block-${index}`}
                    onClick={onOpenHandler}
                    width={{ base: '100%', md: '346px' }}
                    height='100%'
                    cursor='pointer'
                    flexShrink={0}
                />
            )}
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
                    {!(index === 0) && (
                        <IconButton
                            data-test-id={`recipe-steps-remove-button-${index}`}
                            aria-label='Удалить ингредиент'
                            icon={<DeleteIcon color='#2db100' />}
                            onClick={() => remove(index)}
                            colorScheme='red'
                            variant='ghost'
                        />
                    )}
                </Flex>
                <Textarea
                    {...register(`steps.${index}.description` as const, {
                        required: 'Обязательное поле',
                        min: { value: 1, message: 'Минимальное значение 1' },
                    })}
                    data-test-id={`recipe-steps-description-${index}`}
                    border={hasError ? errorBorder : border}
                    borderColor={hasError ? 'rgb(229, 62, 62)' : '#e2e8f0'}
                    placeholder='Шаг'
                    width='100%'
                    height='84px'
                    color='rgba(0, 0, 0, 0.92)'
                    _placeholder={{ color: 'rgba(0, 0, 0, 0.64)' }}
                />
            </Flex>
        </Flex>
    );
};
