import { Card } from '@chakra-ui/icons';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type NoteItemProps = {
    date: string;
    text: string;
};

export const NoteItem = ({ date, text }: NoteItemProps) => {
    const dateObj = new Date(date);

    const day = dateObj.getDate();
    const monthIndex = dateObj.getMonth();
    const hours = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    const months = [
        'января',
        'февраля',
        'марта',
        'апреля',
        'мая',
        'июня',
        'июля',
        'августа',
        'сентября',
        'октября',
        'ноября',
        'декабря',
    ];
    return (
        <Card
            padding='24px 24px 20px 24px'
            width={{ base: '296px', md: '224px', xl: '266px', '2xl': '426px' }}
            height={{ base: '204px', md: '244px', xl: '204px', '2xl': '164px' }}
            gap='16px'
        >
            <Typography Size={TypographySizes.sm} color='#2db100'>
                {`${day} ${months[monthIndex]} ${hours}:${minutes}`}
            </Typography>
            <Typography Size={TypographySizes.sm}>{text}</Typography>
        </Card>
    );
};
