import { Button, Flex, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Cropper, { Area, Point } from 'react-easy-crop';

import { useUploadProfilePhotoMutation } from '~/query/services/users';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { CustomModal } from '~/shared/ui/CustomModal/CustomModal';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import getCroppedImg from '~/shared/utils/getCroppedImg';

type AvatarInputModalProps = {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
};
export const UploadProfilePhotoModal = ({ isOpen, onClose, imageUrl }: AvatarInputModalProps) => {
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const [uploadPhoto] = useUploadProfilePhotoMutation();
    const alert = useAlertToast();

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const onClickHandler = async () => {
        if (!croppedAreaPixels) return;

        try {
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels);
            if (!croppedImage) return;
            const formData = new FormData();
            formData.append('file', croppedImage);
            await uploadPhoto(formData).unwrap();
            onClose();
        } catch {
            alert(defaultAlert, false);
        }
    };

    return (
        <CustomModal onClose={onClose} isOpen={isOpen} width={{ base: '316px', xl: '396px' }}>
            <VStack gap='32px' padding='32px'>
                <Typography Size={TypographySizes['2xl']} textAlign='center'>
                    Изменить изображение профиля
                </Typography>
                <Flex position='relative' width='206px' height='206px'>
                    <Cropper
                        image={imageUrl}
                        crop={crop}
                        onCropChange={setCrop}
                        zoom={zoom}
                        onZoomChange={setZoom}
                        aspect={1}
                        cropShape='round'
                        showGrid={false}
                        onCropComplete={onCropComplete}
                    />
                </Flex>
                <Button onClick={onClickHandler} backgroundColor='#000' color='#fff'>
                    Кадрировать и сохранить
                </Button>
            </VStack>
        </CustomModal>
    );
};
