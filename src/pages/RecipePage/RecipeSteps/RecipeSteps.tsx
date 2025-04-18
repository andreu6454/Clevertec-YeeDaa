import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import StepCard from '~/components/StepCard/StepCard';

interface RecipeStepsProps {
    steps: Array<{ stepNumber: number; description: string; image: string }>;
    screenSize: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
}

const widths = {
    Desktop: '668px',
    Laptop: '578px',
    Tablet: '604px',
    Mobile: '328px',
};

export const RecipeSteps = memo((props: RecipeStepsProps) => {
    const { steps, screenSize } = props;

    const mappedSteps = steps.map((step) => (
        <StepCard
            screenSize={screenSize}
            key={step.stepNumber + 'step'}
            stepNumber={step.stepNumber}
            image={step.image}
            description={step.description}
        />
    ));
    return (
        <Flex direction='column' gap='20px' width={widths[screenSize]}>
            <Text
                fontWeight='500'
                fontSize={screenSize === 'Mobile' || screenSize === 'Tablet' ? '24px' : '48px'}
                lineHeight={screenSize === 'Mobile' || screenSize === 'Tablet' ? '133%' : '100%'}
            >
                Шаги приготовления
            </Text>
            {mappedSteps}
        </Flex>
    );
});
