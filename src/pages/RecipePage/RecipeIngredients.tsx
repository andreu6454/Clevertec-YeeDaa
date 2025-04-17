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
import { useState } from 'react';

import { recipeData } from '~/shared/data/recipeData';

interface RecipeIngredientsProps {
    id: number;
}

export const RecipeIngredients = (props: RecipeIngredientsProps) => {
    const { id } = props;

    const data = recipeData[id];

    const [count, setCount] = useState<number>(1);

    const mappedIngredients = data.ingredients.map((ingridients, index) => {
        const resultCount = Number(count) * Number(ingridients?.count);
        return (
            <Tr background={(index + 1) % 2 ? 'rgba(0, 0, 0, 0.06)' : ''}>
                <Td>{ingridients.title}</Td>
                <Td textAlign='right'>
                    {!!resultCount && resultCount}
                    {' ' + ingridients.measureUnit}
                </Td>
            </Tr>
        );
    });

    return (
        <TableContainer width='578px' height='680px'>
            <Table variant='unstyled'>
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
                                    height='40px'
                                    defaultValue={count.toString()}
                                    min={0}
                                    max={10}
                                >
                                    <NumberInputField />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper />
                                        <NumberDecrementStepper />
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
};
