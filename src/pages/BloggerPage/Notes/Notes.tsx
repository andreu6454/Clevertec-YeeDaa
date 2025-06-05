import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { CardNote } from '~/components/CardNote/CardNote';
import { BloggerNoteType } from '~/shared/types/bloggersTypes';

type NoteProps = {
    notes: BloggerNoteType[] | undefined;
};

export const Notes = ({ notes }: NoteProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [notesData, setNotesData] = useState(notes);

    if (!notes || !notesData) return null;

    const onClickHandler = () => {
        if (isCollapsed) {
            setNotesData(notes);
            setIsCollapsed(false);
            return;
        }
        setNotesData(notes.slice(0, 3));
        setIsCollapsed(true);
        return;
    };

    const notesForRender = notesData.map((el, index) => (
        <CardNote key={el.date + index} text={el.text} date={el.date} />
    ));

    return (
        <VStack
            align='flex-start'
            width='100%'
            borderRadius='16px'
            backgroundColor='rgba(0, 0, 0, 0.04)'
            padding={{ base: '16px', md: '24px 24px 16px 24px' }}
            gap='16px'
        >
            <HStack>
                <Text
                    fontWeight='400'
                    fontSize={{ base: '20px', xl: '36px' }}
                    lineHeight={{ base: '140%', xl: '111%' }}
                >
                    Заметки
                </Text>
                <Text
                    fontWeight='400'
                    fontSize={{ base: '20px', xl: '30px' }}
                    lineHeight={{ base: '140%', xl: '111%' }}
                    color='rgba(0, 0, 0, 0.48)'
                >
                    {`(${notes.length})`}
                </Text>
            </HStack>
            <Flex
                flexDirection={{ base: 'column', md: 'row' }}
                width='100%'
                justifyContent='space-between'
                gap={{ base: '12px', md: '' }}
                flexWrap='wrap'
            >
                {notesForRender}
            </Flex>

            {notes.length > 3 && (
                <Flex width='100%' justifyContent='center'>
                    <Button onClick={onClickHandler} variant='ghost'>
                        {isCollapsed ? 'Показать больше' : 'Свернуть'}
                    </Button>
                </Flex>
            )}
        </VStack>
    );
};
