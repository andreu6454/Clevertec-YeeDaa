import { Table, Thead, Tr } from '@chakra-ui/icons';
import {
    Flex,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    TableContainer,
    Tbody,
    Td,
    Text,
} from '@chakra-ui/react';
import { memo, useState } from 'react';

import { IngredientType } from '~/shared/types/recipeTypes';

interface RecipeIngredientsProps {
    ingredients: IngredientType[];
    screenSize: 'Desktop' | 'Mobile' | 'Laptop' | 'Tablet';
    portions: number;
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

export const RecipeIngredients = memo((props: RecipeIngredientsProps) => {
    const { ingredients, screenSize, portions } = props;

    const [count, setCount] = useState<number>(portions);

    const mappedIngredients = ingredients.map((ingredient, index) => {
        const resultCount = (Number(count) * Number(ingredient?.count)) / portions;
        return (
            <Tr key={ingredient.title} background={(index + 1) % 2 ? 'rgba(0, 0, 0, 0.06)' : ''}>
                <Td>{ingredient.title}</Td>
                <Td textAlign='right'>
                    <span data-test-id={`ingredient-quantity-${index}`}>
                        {!!resultCount && Math.round(resultCount * 10) / 10}
                    </span>
                    {' ' + ingredient.measureUnit}
                </Td>
            </Tr>
        );
    });

    return (
        <TableContainer width={sizes[screenSize].width}>
            <Table variant='unstyled' width='100%' layout='fixed'>
                <Thead>
                    <Tr>
                        <Td>
                            <Text
                                fontWeight='700'
                                fontSize='12px'
                                lineHeight='133%'
                                letterSpacing='0.05em'
                                color='#2db100'
                            >
                                ИНГРЕДИЕНТЫ
                            </Text>
                        </Td>
                        <Td textAlign='right'>
                            <Flex alignItems='center' gap='16px' justifyContent='flex-end'>
                                <Text
                                    fontWeight='700'
                                    fontSize='12px'
                                    lineHeight='133%'
                                    letterSpacing='0.05em'
                                    color='#2db100'
                                >
                                    ПОРЦИЙ
                                </Text>
                                <NumberInput
                                    onChange={(e) => {
                                        setCount(Number(e));
                                    }}
                                    width='90px'
                                    minWidth='73px'
                                    height='40px'
                                    defaultValue={count.toString()}
                                    min={1}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper data-test-id='increment-stepper' />
                                        <NumberDecrementStepper data-test-id='decrement-stepper' />
                                    </NumberInputStepper>
                                </NumberInput>
                            </Flex>
                        </Td>
                    </Tr>
                </Thead>
                <Tbody>{mappedIngredients}</Tbody>
            </Table>
        </TableContainer>
    );
});
