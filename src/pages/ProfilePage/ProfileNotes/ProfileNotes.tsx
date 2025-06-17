import { Flex } from '@chakra-ui/react';

import { CardNote } from '~/components/CardNote/CardNote';
import { BloggerNoteType } from '~/shared/types/bloggersTypes';
import TextWithCount from '~/shared/ui/TextWithCount/TextWithCount';

type ProfileNotesProps = {
    notes: BloggerNoteType[];
};

export const ProfileNotes = ({ notes }: ProfileNotesProps) => {
    const notesCount = notes.length;
    const notesForRender = notes.map((el) => (
        <CardNote key={el.text} date={el.date} text={el.text} />
    ));
    return (
        <Flex
            direction='column'
            borderRadius='16px'
            backgroundColor='rgba(0, 0, 0, 0.04)'
            padding='16px 24px'
            width='100%'
        >
            <Flex>
                <TextWithCount text='Заметки' count={notesCount} />
            </Flex>
            <Flex gap='16px' flexWrap='wrap'>
                {notesForRender}
            </Flex>
        </Flex>
    );
};
