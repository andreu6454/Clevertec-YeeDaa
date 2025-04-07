import { Box, useMediaQuery } from '@chakra-ui/icons';

import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';

export const ReactionsBar = () => {
    const [isTablet] = useMediaQuery('(min-width: 768px)');
    const [isDesktop] = useMediaQuery('(min-width: 1440px)');
    const paddingsReactionBox = isTablet ? '0 16px' : '0 8px';

    if (isDesktop) {
        return (
            <Box
                width='208px'
                height='200px'
                display='flex'
                flexDirection='column'
                padding='16px 56px'
                gap='24px'
            >
                <ReactionCount size='large' variant='bookmark' count={185} />
                <ReactionCount size='large' variant='people' count={589} />
                <ReactionCount size='large' variant='emoji' count={587} />
            </Box>
        );
    }

    return (
        <Box display='flex' padding={paddingsReactionBox}>
            <ReactionCount size='small' variant='bookmark' count={185} />
            <ReactionCount size='small' variant='people' count={589} />
            <ReactionCount size='small' variant='emoji' count={587} />
        </Box>
    );
};
