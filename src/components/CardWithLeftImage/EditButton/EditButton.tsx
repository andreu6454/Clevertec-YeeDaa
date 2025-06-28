import { Button, Flex } from '@chakra-ui/react';

import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';

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
                data-test-id={DATA_TEST_IDS.profileEditButton}
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
