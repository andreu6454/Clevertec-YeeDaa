import { Box, Image } from '@chakra-ui/icons';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';

type UploadImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveHandle: (imageFile: File) => void;
    onDeleteHandle: () => void;
    image?: string | null;
    dataTestId?: string;
};

export const UploadImageModal = (props: UploadImageModalProps) => {
    const { isOpen, onClose, onSaveHandle, image, onDeleteHandle, dataTestId } = props;

    const [previewImage, setPreviewImage] = useState<string | null>(image || null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        if (image) {
            setPreviewImage(image);
        } else {
            setPreviewImage(null);
        }
    }, [image]);

    const handleSaveImage = () => {
        if (!imageFile) return;
        setPreviewImage(null);
        onSaveHandle(imageFile);
    };

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDeleteImage = () => {
        setPreviewImage(null);
        onDeleteHandle();
        setImageFile(null);
        onClose();
    };

    return (
        <CustomModal dataTestId={DATA_TEST_IDS.recipeImageModal} isOpen={isOpen} onClose={onClose}>
            <Flex padding='32px' flexDirection='column' alignItems='center' gap='32px'>
                <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                    Изображение
                </Text>
                <Box>
                    <Input
                        data-test-id={dataTestId}
                        type='file'
                        onChange={handleFileChange}
                        accept='image/*'
                        display='none'
                        id='image-upload'
                    />
                    <label htmlFor='image-upload'>
                        {!previewImage && (
                            <UploadImage
                                dataTestId={DATA_TEST_IDS.recipeImageModalBlock}
                                width='206px'
                                height='206px'
                            />
                        )}
                    </label>
                    {previewImage && (
                        <Image
                            data-test-id={DATA_TEST_IDS.recipeImageModalPreview}
                            width='206px'
                            height='206px'
                            src={previewImage}
                        />
                    )}
                </Box>
                {previewImage && (
                    <Flex flexDirection='column' width='100%' gap='16px'>
                        <Button
                            onClick={handleSaveImage}
                            width='100%'
                            size='lg'
                            backgroundColor='#000'
                            color='#fff'
                        >
                            Сохранить
                        </Button>
                        <Button onClick={handleDeleteImage} variant='ghost' width='100%' size='lg'>
                            Удалить
                        </Button>
                    </Flex>
                )}
            </Flex>
        </CustomModal>
    );
};
