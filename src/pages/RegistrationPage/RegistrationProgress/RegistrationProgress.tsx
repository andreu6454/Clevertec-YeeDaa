import { Box, Progress } from '@chakra-ui/icons';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type RegistrationProgressProps = {
    step: number;
};

export const RegistrationProgress = (props: RegistrationProgressProps) => {
    const { step } = props;

    const progress = [50, 90, 100, 100];

    return (
        <Box>
            <Typography Size={TypographySizes.md}>Шаг 1. Личная информация</Typography>
            <Progress colorScheme='green' size='sm' value={progress[step]} />
        </Box>
    );
};
