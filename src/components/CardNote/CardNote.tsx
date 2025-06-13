import { Card } from '@chakra-ui/icons';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type NoteItemProps = {
    date: string;
    text: string;
    width?: string | { base: string; md: string };
    height?: string | { base: string; md: string; xl: string; '2xl': string };
    visibility?: 'hidden' | 'visible';
};

export const CardNote = ({
    date,
    text,
    width = { base: '100%', md: 'calc(33.333% - 12px)' },
    height = { base: '204px', md: '244px', xl: '204px', '2xl': '164px' },
    visibility = 'visible',
}: NoteItemProps) => {
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
            margin={0}
            padding={height === '0' ? '0' : '24px 24px 20px 24px'}
            height={height}
            gap='16px'
            width={width}
            flexGrow={1}
            visibility={visibility}
        >
            {visibility === 'visible' && (
                <Typography
                    data-test-id={DATA_TEST_IDS.notesCardDate}
                    Size={TypographySizes.sm}
                    color='#2db100'
                >
                    {`${day} ${months[monthIndex]} ${hours}:${minutes}`}
                </Typography>
            )}
            {visibility === 'visible' && (
                <Typography data-test-id={DATA_TEST_IDS.notesCardText} Size={TypographySizes.sm}>
                    {text}
                </Typography>
            )}
        </Card>
    );
};
