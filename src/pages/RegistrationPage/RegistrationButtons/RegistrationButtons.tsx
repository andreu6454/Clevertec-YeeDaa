import { Button } from '@chakra-ui/react';

type RegistrationButtonsProps = {
    onSubmit: () => void;
    step: number;
};

export const RegistrationButtons = (props: RegistrationButtonsProps) => {
    const { step, onSubmit } = props;

    if (step === 2) {
        return (
            <Button
                onClick={onSubmit}
                width='100%'
                size='lg'
                variant='solid'
                backgroundColor='rgba(0, 0, 0, 0.92)'
                color='#fff'
                marginTop='48px'
            >
                Зарегистрироваться
            </Button>
        );
    }

    return (
        <Button
            onClick={onSubmit}
            width='100%'
            size='lg'
            variant='solid'
            backgroundColor='rgba(0, 0, 0, 0.92)'
            color='#fff'
            marginTop='48px'
        >
            Дальше
        </Button>
    );
};
