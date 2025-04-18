import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CaloriesCard } from '~/components/CaloriesCard/CaloriesCard';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface RecipeCaloriesProps {
    nutritionValue: {
        calories: number;
        proteins: number;
        fats: number;
        carbohydrates: number;
    };
}

export const RecipeCalories = memo((props: RecipeCaloriesProps) => {
    const { nutritionValue } = props;

    return (
        <Flex width='578px' gap='20px' direction='column'>
            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.8)'>
                * Калорийность на 1 порцию
            </Typography>
            <Flex width='100%' gap='12px'>
                <CaloriesCard count={nutritionValue.calories} title='калорийность' units='ККАЛ' />
                <CaloriesCard count={nutritionValue.proteins} title='белки' units='ГРАММ' />
                <CaloriesCard count={nutritionValue.fats} title='жиры' units='ГРАММ' />
                <CaloriesCard count={nutritionValue.carbohydrates} title='углеводы' units='ГРАММ' />
            </Flex>
        </Flex>
    );
});
