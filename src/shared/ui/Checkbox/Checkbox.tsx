import { Checkbox } from '@chakra-ui/react';
import { ChangeEvent } from 'react';

import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

interface CheckboxProps {
    onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
    isChecked: boolean;
    title: string;
    dataTestId?: string;
}

export const CustomCheckbox = (props: CheckboxProps) => {
    const { onChangeHandler, isChecked, title, dataTestId } = props;

    return (
        <Checkbox
            data-test-id={dataTestId}
            onChange={onChangeHandler}
            isChecked={isChecked}
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
        >
            <Typography Size={TypographySizes.sm}>{title}</Typography>
        </Checkbox>
    );
};
