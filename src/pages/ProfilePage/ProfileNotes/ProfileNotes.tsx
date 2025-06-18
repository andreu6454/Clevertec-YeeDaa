import { Button, Flex, Image, useDisclosure } from '@chakra-ui/react';

import PenIcon from '~/assets/svg/penIcon.svg';
import { CardNote } from '~/components/CardNote/CardNote';
import { CreateNoteDrawer } from '~/components/CreateNoteDrawer/CreateNoteDrawer';
import { BloggerNoteType } from '~/shared/types/bloggersTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';

type ProfileNotesProps = {
    notes: BloggerNoteType[];
};

export const ProfileNotes = ({ notes }: ProfileNotesProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const notesCount = notes.length;
    const notesForRender = notes.map((el) => (
        <CardNote key={el.text} date={el.date} text={el.text} />
    ));

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
            <Flex gap='16px' flexWrap='wrap'>
                {notesForRender}
            </Flex>
            <CreateNoteDrawer isOpen={isOpen} onClose={onClose} />
        </Flex>
    );
};
