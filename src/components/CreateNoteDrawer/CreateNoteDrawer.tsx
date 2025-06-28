import { Drawer, Image } from '@chakra-ui/icons';
import { Button, DrawerContent, DrawerOverlay, Flex, Text, Textarea } from '@chakra-ui/react';
import { ChangeEvent, useState } from 'react';

import CloseIcon from '~/assets/svg/close.svg';
import { useCreateNoteMutation } from '~/query/services/users';
import { defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';

type CreateNoteDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const CreateNoteDrawer = ({ isOpen, onClose }: CreateNoteDrawerProps) => {
    const [note, setNote] = useState('');
    const [error, setError] = useState(false);
    const [createNote] = useCreateNoteMutation();

    const alert = useAlertToast();

    const onCloseHandler = () => {
        onClose();
    };

    const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.currentTarget.value);
        setError(false);
    };

    const onCreateNote = async () => {
        if (note.length > 10 && note.length < 160) {
            try {
                await createNote(note);
                alert(
                    {
                        status: 'success',
                        title: 'Заметка опубликована',
                    },
                    false,
                );
                setNote('');
                onClose();
            } catch {
                alert(defaultAlert, false);
            }
            return;
        }
        setError(true);
    };

    return (
        <Drawer
            data-test-id={DATA_TEST_IDS.filterDrawer}
            size={{ base: 'xs', xl: 'sm' }}
            isOpen={isOpen}
            onClose={onClose}
        >
            <DrawerOverlay />
            <DrawerContent padding='32px' gap='16px'>
                <Flex paddingBottom='16px' justifyContent='space-between' alignItems='center'>
                    <Text fontWeight='700' fontSize='24px' lineHeight='133%'>
                        Фильтр
                    </Text>
                    <Image
                        data-test-id='close-filter-drawer'
                        cursor='pointer'
                        onClick={onCloseHandler}
                        src={CloseIcon}
                    />
                </Flex>
                <Flex flexDirection='column' justify='space-between' height='100%'>
                    <Textarea
                        borderColor={error ? '#e53e3e' : '#e2e8f0'}
                        value={note}
                        onChange={onChangeHandler}
                        placeholder='Максимально 160 символов'
                    />
                    <Flex justifyContent='flex-end'>
                        <Button
                            onClick={onCreateNote}
                            size={{ base: 'sm', xl: 'lg' }}
                            backgroundColor='rgba(0, 0, 0, 0.92)'
                            color='#fff'
                        >
                            Опубликовать
                        </Button>
                    </Flex>
                </Flex>
            </DrawerContent>
        </Drawer>
    );
};
