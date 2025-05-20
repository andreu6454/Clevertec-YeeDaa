import { Box, Progress } from '@chakra-ui/icons';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type RegistrationProgressProps = {
    registrationProgress: number;
    step: number;
};

export const RegistrationProgress = (props: RegistrationProgressProps) => {
    const { registrationProgress, step } = props;

    const title = ['Шаг 1. Личная информация', 'Шаг 2. Логин и пароль'];

    return (
        <Box>
            <Typography Size={TypographySizes.md}>{title[step]}</Typography>
            <Progress colorScheme='green' size='sm' value={registrationProgress} />
        </Box>
    );
};
