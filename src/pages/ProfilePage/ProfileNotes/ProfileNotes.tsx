import { Box } from '@chakra-ui/icons';
import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';

import PenIcon from '~/assets/svg/penIcon.svg';
import { CardNote } from '~/components/CardNote/CardNote';
import { CreateNoteDrawer } from '~/components/CreateNoteDrawer/CreateNoteDrawer';
import { useDeleteNoteMutation } from '~/query/services/users';
import { ALERT_STATUSES, defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { NoteType } from '~/shared/types/bloggersTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';

type ProfileNotesProps = {
    notes: NoteType[];
};

export const ProfileNotes = ({ notes }: ProfileNotesProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [allNotes, setAllNotes] = useState<NoteType[]>(notes);

    const [deleteNote] = useDeleteNoteMutation();

    const alert = useAlertToast();

    const notesCount = allNotes.length;
    const notesForRender = allNotes.map((el) => {
        const onDeleteHandler = async () => {
            try {
                await deleteNote(el._id).unwrap();
                setAllNotes(notes.filter((note) => note._id !== el._id));
                alert(
                    {
                        status: ALERT_STATUSES.success,
                        title: USERS_ALERTS.deleteNote,
                    },
                    false,
                );
            } catch {
                alert(defaultAlert, false);
            }
        };

        return (
            <CardNote
                key={el.text}
                date={el.date}
                text={el.text}
                isAuthor
                onDeleteHandler={onDeleteHandler}
            />
        );
    });

    const onClickHandler = () => {
        onOpen();
    };

    return (
        <Flex
            data-test-id={DATA_TEST_IDS.blogNotesBox}
            direction='column'
            borderRadius='16px'
            backgroundColor='rgba(0, 0, 0, 0.04)'
            padding='16px 24px'
            width='100%'
            gap='16px'
        >
            <Flex justify='space-between'>
                <TextWithCount text='Заметки' count={notesCount} />
                <Button
                    onClick={onClickHandler}
                    leftIcon={<Image src={PenIcon} />}
                    size='sm'
                    variant='outline'
                    borderColor='rgba(0, 0, 0, 0.48)'
                >
                    Новая заметка
                </Button>
            </Flex>
            <Flex
                data-test-id={DATA_TEST_IDS.bloggerUserNotesGrid}
                gap='16px'
                flexWrap='wrap'
                alignItems='center'
            >
                <Box width={0} height={0} visibility='hidden'>
                    ...
                </Box>
                {notesForRender}
            </Flex>
            <CreateNoteDrawer setAllNotes={setAllNotes} isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
