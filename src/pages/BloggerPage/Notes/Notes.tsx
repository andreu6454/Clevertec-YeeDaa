import { Button, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react';

import { CardNote } from '~/components/CardNote/CardNote';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { BloggerNoteType } from '~/shared/types/bloggersTypes';

type NoteProps = {
    notes: BloggerNoteType[] | undefined;
};

// const collapsedCount = 3;

export const Notes = ({ notes }: NoteProps) => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    // const [notesData, setNotesData] = useState(notes);

    const onClickHandler = () => {
        if (isCollapsed) {
            // setNotesData(notes);
            setIsCollapsed(false);
            return;
        }
        // setNotesData(notes?.slice(0, collapsedCount));
        setIsCollapsed(true);
        return;
    };

    const notesForRender = notes?.map((el, index) => (
        <CardNote
            width={isCollapsed && index > 2 ? '0' : { base: '100%', md: 'calc(33.333% - 12px)' }}
            height={
                isCollapsed && index > 2
                    ? '0'
                    : { base: '204px', md: '244px', xl: '204px', '2xl': '164px' }
            }
            key={el.date + index}
            text={el.text}
            date={el.date}
            visibility={isCollapsed && index > 2 ? 'hidden' : 'visible'}
        />
    ));

    return (
        <VStack
            data-test-id={DATA_TEST_IDS.blogNotesBox}
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
                    data-test-id={DATA_TEST_IDS.bloggerUserNotesCount}
                    fontWeight='400'
                    fontSize={{ base: '20px', xl: '30px' }}
                    lineHeight={{ base: '140%', xl: '111%' }}
                    color='rgba(0, 0, 0, 0.48)'
                >
                    {`(${notes?.length === undefined ? 0 : notes?.length})`}
                </Text>
            </HStack>
            <Flex
                data-test-id={DATA_TEST_IDS.bloggerUserNotesGrid}
                flexDirection={{ base: 'column', md: 'row' }}
                width='100%'
                justifyContent='space-between'
                gap={{ base: '12px', md: '' }}
                flexWrap='wrap'
            >
                {notesForRender}
            </Flex>

            {notes?.length && notes?.length > 3 && (
                <Flex width='100%' justifyContent='center'>
                    <Button
                        data-test-id={DATA_TEST_IDS.bloggerUserNotesButton}
                        onClick={onClickHandler}
                        variant='ghost'
                    >
                        {isCollapsed ? 'Показать больше' : 'Свернуть'}
                    </Button>
                </Flex>
            )}
        </VStack>
    );
};
