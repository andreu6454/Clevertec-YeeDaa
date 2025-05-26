import { Image } from '@chakra-ui/icons';
import { Flex, Input } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import UploadImage from '~/assets/uploadImage.png';

export const ImageUploader = () => {
    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event?.target?.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Flex direction='column' width='353px' height='410px'>
            <Input
                type='file'
                onChange={handleFileChange}
                accept='image/*'
                display='none'
                id='image-upload'
                p={1}
            />
            {!preview && (
                <label htmlFor='image-upload'>
                    <Image src={UploadImage} width='100%' height='100%' cursor='pointer' />
                </label>
            )}
            {preview && <Image src={preview} alt='Preview' width='100%' height='100%' />}
        </Flex>
    );
};
