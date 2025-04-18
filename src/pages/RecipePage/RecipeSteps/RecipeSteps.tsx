import { Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import StepCard from '~/components/StepCard/StepCard';

interface RecipeStepsProps {
    steps: Array<{ stepNumber: number; description: string; image: string }>;
}

export const RecipeSteps = memo((props: RecipeStepsProps) => {
    const { steps } = props;

    const mappedSteps = steps.map((step) => (
        <StepCard
            key={step.stepNumber + 'step'}
            stepNumber={step.stepNumber}
            image={step.image}
            description={step.description}
        />
    ));
    return (
        <Flex direction='column' gap='20px' width='578px'>
            <Text fontWeight='500' fontSize='48px' lineHeight='100%'>
                Шаги приготовления
            </Text>
            {mappedSteps}
        </Flex>
    );
});
