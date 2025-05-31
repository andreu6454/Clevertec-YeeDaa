import { Image } from '@chakra-ui/icons';
import { Button, Flex, Input, Text } from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';

import { useUploadImageMutation } from '~/query/services/newRecipe';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import UploadImage from '~/shared/ui/UploadImage/UploadImage';

type UploadImageModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onSaveHandle: (url: string) => void;
    image?: string | null;
    onDeleteHandle: () => void;
};

export const UploadImageModal = (props: UploadImageModalProps) => {
    const { isOpen, onClose, onSaveHandle, image, onDeleteHandle } = props;

    const [previewImage, setPreviewImage] = useState<string | null>();
    const [imageFile, setImageFile] = useState<File | null>(null);

    useEffect(() => {
        setPreviewImage(image);
    }, [image]);

    const [uploadImage] = useUploadImageMutation();

    const handleSaveImage = async () => {
        if (imageFile) {
            try {
                const formData = new FormData();
                formData.append('file', imageFile);
                const result = await uploadImage(formData).unwrap();

                setPreviewImage(null);
                onSaveHandle(result.url);
                onClose();
            } catch (e) {
                console.log(e);
            }
        }
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
        <CustomModal isOpen={isOpen} onClose={onClose}>
            <Flex padding='32px' flexDirection='column' alignItems='center' gap='32px'>
                <Text fontWeight='700' fontSize='24px' lineHeight='133%' textAlign='center'>
                    Изображение
                </Text>
                <Input
                    type='file'
                    onChange={handleFileChange}
                    accept='image/*'
                    display='none'
                    id='image-upload'
                    p={1}
                />
                <label htmlFor='image-upload'>
                    {!previewImage && <UploadImage width='206px' height='206px' />}
                </label>
                {previewImage && <Image width='206px' height='206px' src={previewImage} />}
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
