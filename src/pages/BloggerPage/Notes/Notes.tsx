import { Flex, HStack, Text, VStack } from '@chakra-ui/react';

import { NoteItem } from '~/pages/BloggerPage/Notes/NoteItem';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { BloggerNoteType } from '~/shared/types/bloggersTypes';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type NoteProps = {
    notes: BloggerNoteType[] | undefined;
};

export const Notes = ({ notes }: NoteProps) => {
    const { isDesktopLaptop } = useScreenSize();

    if (!notes) return null;

    const notesForRender = notes.map((el, index) => (
        <NoteItem key={el.date + index} text={el.text} date={el.date} />
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
            >
                {notesForRender}
            </Flex>

            <Flex width='100%' justifyContent='center'>
                <Typography
                    Size={isDesktopLaptop ? TypographySizes.sm : TypographySizes.xs}
                    fontWeight={600}
                >
                    Показать больше
                </Typography>
            </Flex>
        </VStack>
    );
};
