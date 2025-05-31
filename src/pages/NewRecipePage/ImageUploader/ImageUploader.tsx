import { Image } from '@chakra-ui/icons';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { useUploadImageMutation } from '~/query/services/newRecipe';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { getImageUrl } from '~/shared/services/getImageUrl';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';
import { UploadImageModal } from '~/shared/ui/UploadImageModal/UploadImageModal';

type ImageUploaderProps = {
    setValue: UseFormSetValue<NewRecipeDataType>;
    getValues: UseFormGetValues<NewRecipeDataType>;
    hasError: boolean;
};

export const ImageUploader = (props: ImageUploaderProps) => {
    const { setValue, getValues, hasError } = props;

    const image = getValues('image');
    const imageUrl = getImageUrl(image);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [uploadImage] = useUploadImageMutation();

    const onSaveHandle = async (imageFile: File) => {
        try {
            onClose();
            const formData = new FormData();
            formData.append('file', imageFile);

            const result = await uploadImage(formData).unwrap();
            setValue('image', result.url, { shouldDirty: true });

            onClose();
        } catch (e) {
            console.log(e);
        }
    };

    const onDeleteHandle = () => {
        setValue('image', '');
    };

    const handleOpen = () => {
        onOpen();
    };

    const errorBorder = '2px solid rgb(229, 62, 62)';

    return (
        <Flex
            border={hasError ? errorBorder : ''}
            borderColor={hasError ? 'rgb(229, 62, 62)' : ''}
            direction='column'
            width={{ base: '100%', md: '232px', xl: '353px', '2xl': '553px' }}
            height={{ base: '224px', xl: '410px' }}
            borderRadius='10px'
            alignItems='center'
            flexShrink={0}
            data-test-id={DATA_TEST_IDS.recipeImageBlock}
        >
            {image ? (
                <Image
                    data-test-id={DATA_TEST_IDS.recipeImageBlockPreview}
                    src={imageUrl}
                    onClick={handleOpen}
                    width='100%'
                    height='100%'
                    cursor='pointer'
                />
            ) : (
                <UploadImage onClick={handleOpen} width='100%' height='100%' cursor='pointer' />
            )}

            <UploadImageModal
                dataTestId={DATA_TEST_IDS.recipeImageBlockInput}
                image={image ? imageUrl : ''}
                onDeleteHandle={onDeleteHandle}
                isOpen={isOpen}
                onClose={onClose}
                onSaveHandle={onSaveHandle}
            />
        </Flex>
    );
};
