import { IconButton, Image } from '@chakra-ui/icons';

interface FooterIconProps {
    image: string;
    marginY?: string;
}

export const FooterIcon = (props: FooterIconProps) => {
    const { image, marginY } = props;
    return (
        <IconButton variant='ghost' aria-label='Главная'>
            <Image marginY={marginY} src={image} />
        </IconButton>
    );
};
