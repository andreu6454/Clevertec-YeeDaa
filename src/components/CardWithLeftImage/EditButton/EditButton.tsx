import { Button, Flex } from '@chakra-ui/react';

type DraftEditButtonProps = {
    isDraft: boolean;
    id: string;
    onEditHandler?: () => void;
};

export const EditButton = ({ isDraft, onEditHandler }: DraftEditButtonProps) => {
    const onClickHandler = () => {
        onEditHandler?.();
    };

    return (
        <Flex justifyContent='flex-end'>
            <Button
                onClick={onClickHandler}
                size={{ base: 'xs', xl: 'sm' }}
                variant={isDraft ? 'solid' : 'outline'}
                color={isDraft ? '#fff' : '#000'}
                backgroundColor={isDraft ? '#000' : 'transparent'}
                borderColor='#000'
            >
                Редактировать
            </Button>
        </Flex>
    );
};
