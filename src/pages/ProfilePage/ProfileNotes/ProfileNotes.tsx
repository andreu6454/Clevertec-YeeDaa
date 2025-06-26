import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';

import PenIcon from '~/assets/svg/penIcon.svg';
import { CardNote } from '~/components/CardNote/CardNote';
import { CreateNoteDrawer } from '~/components/CreateNoteDrawer/CreateNoteDrawer';
import { useDeleteNoteMutation } from '~/query/services/users';
import { ALERT_STATUSES, defaultAlert } from '~/shared/constants/alertStatuses/defaultAlert';
import { USERS_ALERTS } from '~/shared/constants/alertStatuses/usersAlerts';
import { useAlertToast } from '~/shared/hooks/useAlertToast';
import { NoteType } from '~/shared/types/bloggersTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';

type ProfileNotesProps = {
    notes: NoteType[];
};

export const ProfileNotes = ({ notes }: ProfileNotesProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [deleteNote] = useDeleteNoteMutation();

    const alert = useAlertToast();

    const notesCount = notes.length;
    const notesForRender = notes.map((el) => {
        const onDeleteHandler = async () => {
            try {
                await deleteNote(el._id);
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
            <Flex gap='16px' flexWrap='wrap' alignItems='center'>
                {notesForRender}
            </Flex>
            <CreateNoteDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
