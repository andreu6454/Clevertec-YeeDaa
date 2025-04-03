import { Box } from '@chakra-ui/icons';
import { Image, Text } from '@chakra-ui/react';

import Bookmark from '../../assets/bookmark.svg';
import Emoji from '../../assets/emojiHeartEyes.svg';
import Peoples from '../../assets/peoples.svg';

interface ReactionCountProps {
    variant: 'bookmark' | 'people' | 'emoji';
    count: number;
}

export const ReactionCount = (props: ReactionCountProps) => {
    const { variant, count } = props;

    const image = {
        bookmark: Bookmark,
        people: Peoples,
        emoji: Emoji,
    };

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='56px'
            padding='6px 8px'
            height='24px'
        >
            <Image mr='2px' src={image[variant]} />
            <Text fontWeight={600} fontSize='12px' lineHeight='133%' color='#2db100'>
                {count}
            </Text>
        </Box>
    );
};
