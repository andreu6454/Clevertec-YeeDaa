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

interface RecipeIngredientsProps {
    ingredients: Array<{ title: string; count: string; measureUnit: string }>;
}

export const RecipeIngredients = memo((props: RecipeIngredientsProps) => {
    const { ingredients } = props;

    const [count, setCount] = useState<number>(1);

    const mappedIngredients = ingredients.map((ingredient, index) => {
        const resultCount = Number(count) * Number(ingredient?.count);
        return (
            <Tr key={ingredient.title} background={(index + 1) % 2 ? 'rgba(0, 0, 0, 0.06)' : ''}>
                <Td>{ingredient.title}</Td>
                <Td textAlign='right'>
                    {!!resultCount && resultCount}
                    {' ' + ingredient.measureUnit}
                </Td>
            </Tr>
        );
    });

    return (
        <TableContainer width='578px'>
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
});
