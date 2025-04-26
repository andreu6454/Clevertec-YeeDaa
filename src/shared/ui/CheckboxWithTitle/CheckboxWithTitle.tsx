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
}

export const CheckboxWithTitle = (props: CheckboxWithTitleProps) => {
    const { dataTestId, title, isChecked, index, onChange } = props;

    return (
        <Flex
            padding='6px 16px'
            alignItems='center'
            as='div'
            width='269px'
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
                        border: '2px solid #d7ff94',
                    },
                }}
                _checked={{
                    '& .chakra-checkbox__control': {
                        bg: '#d7ff94',
                        borderColor: '#d7ff94',
                    },
                }}
                _hover={{
                    '& .chakra-checkbox__control': {
                        borderColor: '#d7ff94',
                    },
                }}
            />
            <Typography Size={TypographySizes.sm}>{title}</Typography>
        </Flex>
    );
};
