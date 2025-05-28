import { Checkbox } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CheckboxWithTitleProps {
    dataTestId: string;
    index: number;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    title: string;
    width?: string;
}

export const CheckboxWithTitle = (props: CheckboxWithTitleProps) => {
    const { dataTestId, title, isChecked, index, onChange, width = '269px' } = props;

    return (
        <Flex
            padding='6px 16px'
            alignItems='center'
            as='div'
            width={width}
            height='32px'
            backgroundColor={index % 2 === 0 ? 'rgba(0, 0, 0, 0.06)' : '#fff'}
            gap='8px'
        >
            <Checkbox
                data-test-id={dataTestId}
                onChange={onChange}
                isChecked={isChecked}
                key={'checkbox' + title}
                colorScheme='green'
                sx={{
                    '& .chakra-checkbox__control': {
                        border: '2px solid #b1ff2e',
                    },
                }}
                _checked={{
                    '& .chakra-checkbox__control': {
                        bg: '#d7ff94',
                        borderColor: '#b1ff2e',
                        color: 'black',
                    },
                }}
                _hover={{
                    '& .chakra-checkbox__control': {
                        borderColor: '#b1ff2e',
                        color: 'black',
                    },
                }}
            />
            <Typography Size={TypographySizes.sm}>{title}</Typography>
        </Flex>
    );
};
