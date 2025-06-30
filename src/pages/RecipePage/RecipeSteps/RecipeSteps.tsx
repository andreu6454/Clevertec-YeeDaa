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
        <Flex
            direction='column'
            gap='20px'
            width={{ base: '100%', md: '604px', xl: '578px', '2xl': '668px' }}
        >
            <Text
                fontWeight='500'
                fontSize={{ base: '24px', xl: '48px' }}
                lineHeight={{ base: '133%', xl: '100%' }}
            >
                Шаги приготовления
            </Text>
            {mappedSteps}
        </Flex>
    );
});
