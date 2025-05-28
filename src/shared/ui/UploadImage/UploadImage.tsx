import { FlexProps } from '@chakra-ui/icons';
import { Flex, Image } from '@chakra-ui/react';

import UploadImageSVG from '~/assets/svg/uploadImage.svg';

type UploadImageProps = FlexProps;

const UploadImage = (props: UploadImageProps) => (
    <Flex
        {...props}
        backgroundColor='rgba(0, 0, 0, 0.08)'
        alignItems='center'
        justifyContent='center'
        borderRadius='8px'
    >
        <Image width='32px' height='32px' src={UploadImageSVG} />
    </Flex>
);

export default UploadImage;
