import { Box } from '@chakra-ui/icons';
import { Image, Text } from '@chakra-ui/react';

import RecommendationIcon from '~/assets/svg/recommendation.svg';

import Bookmark from '../../../assets/svg/bookmark.svg';
import Emoji from '../../../assets/svg/emojiHeartEyes.svg';
import Peoples from '../../../assets/svg/peoples.svg';
import PeoplesUnfilled from '../../../assets/svg/peoplesUnfilled.svg';

interface ReactionCountProps {
    variant: 'bookmark' | 'people' | 'emoji' | 'peopleUnfilled' | 'recommendation';
    count: number;
    size: 'small' | 'large';
    dataTestId?: string;
}

export const ReactionCount = (props: ReactionCountProps) => {
    const { variant, count, size, dataTestId } = props;

    const image = {
        bookmark: Bookmark,
        peopleUnfilled: PeoplesUnfilled,
        people: Peoples,
        emoji: Emoji,
        recommendation: RecommendationIcon,
    };

    const sizes = {
        small: {
            h: '24px',
            imageW: '12px',
            fWeight: '600',
            fSize: '12px',
            lHeight: '133%',
            pg: '6px 8px',
            mr: '6px',
            jsc: 'space-between',
        },
        large: {
            h: '40px',
            imageW: '16px',
            fWeight: '600',
            fSize: '16px',
            lHeight: '150%',
            pg: '6px 8px',
            mr: '6px',
            jsc: 'center',
        },
    };

    return (
        <Box
            display='flex'
            alignItems='center'
            justifyContent={sizes[size].jsc}
            padding={sizes[size].pg}
            height={sizes[size].h}
        >
            <Image
                width={sizes[size].imageW}
                height={sizes[size].imageW}
                mr={sizes[size].mr}
                src={image[variant]}
            />
            <Text
                data-test-id={dataTestId}
                fontWeight={sizes[size].fWeight}
                fontSize={sizes[size].fSize}
                lineHeight={sizes[size].lHeight}
                color='#2db100'
            >
                {count}
            </Text>
        </Box>
    );
};
