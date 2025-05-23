import { Button } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

type RegistrationButtonsProps = {
    onSubmit: () => void;
    step: number;
};

export const RegistrationButtons = (props: RegistrationButtonsProps) => {
    const { step, onSubmit } = props;

    const buttonTitles = ['Дальше', ' Зарегистрироваться'];

    return (
        <Button
            data-test-id={DATA_TEST_IDS.submitButton}
            onClick={onSubmit}
            width='100%'
            size='lg'
            variant='solid'
            backgroundColor='rgba(0, 0, 0, 0.92)'
            color='#fff'
            marginTop='48px'
        >
            {buttonTitles[step]}
        </Button>
    );
};
