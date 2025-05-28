import { Image } from '@chakra-ui/icons';
import { Flex, useDisclosure } from '@chakra-ui/react';
import { FieldErrors, UseFormGetValues, UseFormSetValue } from 'react-hook-form';

import { NewRecipeDataType } from '~/pages/NewRecipePage/NewRecipePage';
import { getImageUrl } from '~/shared/services/getImageUrl';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';
import { UploadImageModal } from '~/shared/ui/UploadImageModal/UploadImageModal';

type ImageUploaderProps = {
    setValue: UseFormSetValue<NewRecipeDataType>;
    getValues: UseFormGetValues<NewRecipeDataType>;
    errors: FieldErrors<NewRecipeDataType>;
};

export const ImageUploader = (props: ImageUploaderProps) => {
    const { setValue, getValues, errors } = props;

    const image = getValues('image');

    const { isOpen, onOpen, onClose } = useDisclosure();

    const onSaveHandle = async (url: string) => {
        setValue('image', url);
    };

    const handleOpen = () => {
        onOpen();
    };

    const errorBorder = '2px solid #e53e3e';

    return (
        <Flex
            border={errors?.image?.message && errorBorder}
            direction='column'
            width={{ base: '100%', md: '232px', xl: '353px', '2xl': '553px' }}
            height={{ base: '224px', xl: '410px' }}
            borderRadius='10px'
            alignItems='center'
            flexShrink={0}
        >
            {image ? (
                <Image
                    src={getImageUrl(image)}
                    onClick={handleOpen}
                    width='100%'
                    height='100%'
                    cursor='pointer'
                />
            ) : (
                <UploadImage onClick={handleOpen} width='100%' height='100%' cursor='pointer' />
            )}

            <UploadImageModal isOpen={isOpen} onClose={onClose} onSaveHandle={onSaveHandle} />
        </Flex>
    );
};
