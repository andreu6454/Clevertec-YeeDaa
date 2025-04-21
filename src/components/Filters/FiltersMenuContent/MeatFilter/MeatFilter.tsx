import { Checkbox } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { meatFilters } from '~/shared/data/recipeFilters';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const MeatFilter = () => {
    const mappedFilters = meatFilters.map((el) => (
        <Checkbox
            key={'checkbox' + el.title}
            colorScheme='green'
            sx={{
                '& .chakra-checkbox__control': {
                    border: '2px solid #d7ff94',
                },
            }}
            _checked={{
                '& .chakra-checkbox__control': {
                    bg: '#d7ff94',
                    borderColor: '#d7ff94',
                },
            }}
        >
            <Typography Size={TypographySizes.sm}>{el.title}</Typography>
        </Checkbox>
    ));

    return (
        <Flex direction='column' gap='12px'>
            <Typography Size={TypographySizes.md}>Тип мяса:</Typography>
            {mappedFilters}
        </Flex>
    );
};
