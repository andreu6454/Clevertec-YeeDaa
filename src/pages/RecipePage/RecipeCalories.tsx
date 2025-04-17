import { Flex } from '@chakra-ui/react';

import { CaloriesCard } from '~/components/CaloriesCard/CaloriesCard';
import { recipeData } from '~/shared/data/recipeData';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface RecipeCaloriesProps {
    id: number;
}

export const RecipeCalories = (props: RecipeCaloriesProps) => {
    const { id } = props;

    const data = recipeData[id];

    return (
        <Flex width='578px' gap='20px' direction='column'>
            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.8)'>
                * Калорийность на 1 порцию
            </Typography>
            <Flex width='100%' gap='12px'>
                <CaloriesCard
                    count={data.nutritionValue.calories}
                    title='калорийность'
                    units='ККАЛ'
                />
                <CaloriesCard count={data.nutritionValue.proteins} title='белки' units='ГРАММ' />
                <CaloriesCard count={data.nutritionValue.fats} title='жиры' units='ГРАММ' />
                <CaloriesCard
                    count={data.nutritionValue.carbohydrates}
                    title='углеводы'
                    units='ГРАММ'
                />
            </Flex>
        </Flex>
    );
};
