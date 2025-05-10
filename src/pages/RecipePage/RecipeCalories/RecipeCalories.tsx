import { Flex } from '@chakra-ui/react';
import { memo } from 'react';

import { CaloriesCard } from '~/components/CaloriesCard/CaloriesCard';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface RecipeCaloriesProps {
    nutritionValue: {
        calories: number;
        protein: number;
        fats: number;
        carbohydrates: number;
    };
    screenSize: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
}

const sizes = {
    Desktop: {
        width: '668px',
    },
    Laptop: {
        width: '578px',
    },
    Tablet: {
        width: '728px',
    },
    Mobile: {
        width: '328px',
    },
};

export const RecipeCalories = memo((props: RecipeCaloriesProps) => {
    const { nutritionValue, screenSize } = props;

    return (
        <Flex width={sizes[screenSize].width} gap='20px' direction='column'>
            <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.8)'>
                * Калорийность на 1 порцию
            </Typography>
            <Flex width='100%' gap='12px' direction={screenSize === 'Mobile' ? 'column' : 'row'}>
                <CaloriesCard
                    screenSize={screenSize}
                    count={nutritionValue.calories}
                    title='калорийность'
                    units='ККАЛ'
                />
                <CaloriesCard
                    screenSize={screenSize}
                    count={nutritionValue.protein}
                    title='белки'
                    units='ГРАММ'
                />
                <CaloriesCard
                    screenSize={screenSize}
                    count={nutritionValue.fats}
                    title='жиры'
                    units='ГРАММ'
                />
                <CaloriesCard
                    screenSize={screenSize}
                    count={nutritionValue.carbohydrates}
                    title='углеводы'
                    units='ГРАММ'
                />
            </Flex>
        </Flex>
    );
});
