import { Button } from '@chakra-ui/react';
import { Dispatch, SetStateAction } from 'react';

type RegistrationButtonsProps = {
    setStep: Dispatch<SetStateAction<number>>;
    step: number;
};

export const RegistrationButtons = (props: RegistrationButtonsProps) => {
    const { step, setStep } = props;

    const onNextClick = () => {
        setStep((prev) => prev + 1);
    };

    if (step === 2) {
        return (
            <Button
                width='100%'
                size='lg'
                variant='solid'
                backgroundColor='rgba(0, 0, 0, 0.92)'
                color='#fff'
            >
                Зарегистрироваться
            </Button>
        );
    }

    return (
        <Button
            onClick={onNextClick}
            width='100%'
            size='lg'
            variant='solid'
            backgroundColor='rgba(0, 0, 0, 0.92)'
            color='#fff'
        >
            Дальше
        </Button>
    );
};
