import { Drawer, Image } from '@chakra-ui/icons';
import { Button, DrawerContent, DrawerOverlay, Flex, Text, Textarea } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction } from 'react';
import { useForm } from 'react-hook-form';

import CloseIcon from '~/assets/svg/close.svg';
import { useCreateNoteMutation } from '~/query/services/users';
import { ALERT_STATUSES } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { NoteType } from '~/shared/types/bloggersTypes';
import { cardNoteSchema } from '~/shared/types/validationSchemas/userProfileSchema';

type CreateNoteDrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    setAllNotes: Dispatch<SetStateAction<NoteType[]>>;
};

export type CardNoteDataType = {
    note: string;
};

export const CreateNoteDrawer = ({ isOpen, onClose, setAllNotes }: CreateNoteDrawerProps) => {
    const [createNote] = useCreateNoteMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CardNoteDataType>({
        resolver: zodResolver(cardNoteSchema),
    });

    const alert = useAlertToast();

    const onCreateNote = handleSubmit(async (data) => {
        try {
            const newNote = await createNote(data.note).unwrap();
            if (!newNote) return;
            alert(
                {
                    status: ALERT_STATUSES.success,
                    title: USERS_ALERTS.createNote,
                },
                false,
            );
            setAllNotes((prev) => [...prev, { ...newNote, date: new Date().toString() }]);
            onClose();
        } catch {
            alert(
                {
                    status: ALERT_STATUSES.error,
                    title: USERS_ALERTS.serverError,
                    description: USERS_ALERTS.tryLater,
                },
                false,
            );
            onClose();
        }

        return;
    });

    return (
        <Drawer size={{ base: 'xs', xl: 'sm' }} isOpen={isOpen} onClose={onClose}>
            <DrawerOverlay />
            <form onSubmit={onCreateNote}>
                <DrawerContent data-test-id={DATA_TEST_IDS.filterDrawer} padding='32px' gap='16px'>
                    <Flex paddingBottom='16px' justifyContent='space-between' alignItems='center'>
                        <Text fontWeight='700' fontSize='24px' lineHeight='133%'>
                            Новая заметка
                        </Text>
                        <Image
                            data-test-id='close-filter-drawer'
                            cursor='pointer'
                            onClick={onClose}
                            src={CloseIcon}
                        />
                    </Flex>
                    <Flex flexDirection='column' justify='space-between' height='100%'>
                        <Textarea
                            {...register('note')}
                            borderColor={errors?.note?.message ? '#e53e3e' : '#e2e8f0'}
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
            </form>
        </Drawer>
    );
};
