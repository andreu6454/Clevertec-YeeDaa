import { IconButton, SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetStatisticQuery } from '~/query/services/users';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { getReactionCount } from '~/shared/utils/getReactionCount';

type ProfileTitleProps = {
    firstName: string;
    lastName: string;
    login: string;
    subscribersCount: number;
    photoLink?: string;
};

export const ProfileTitle = ({
    firstName,
    lastName,
    login,
    photoLink,
    subscribersCount,
}: ProfileTitleProps) => {
    const { data: StatisticData } = useGetStatisticQuery();

    const navigate = useNavigate();

    const bookmarks = getReactionCount(StatisticData?.bookmarks || []);

    const onClickHandler = () => {
        navigate(APP_PATHS.profileSettings);
    };

    return (
        <Flex
            data-test-id={DATA_TEST_IDS.userProfileBox}
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems='center'
            paddingY='16px'
            gap='24px'
            width='100%'
        >
            <Avatar size='2xl' name={`${firstName} ${lastName}`} src={getImageUrl(photoLink)} />
            <IconButton
                data-test-id={DATA_TEST_IDS.settingsButton}
                size='lg'
                top={{ base: 20, xl: 24 }}
                right={{ base: 4, xl: 200 }}
                onClick={onClickHandler}
                aria-label='настройки'
                icon={<SettingsIcon width='24px' height='24px' />}
                variant='ghost'
                position='absolute'
            />
            <VStack alignItems={{ base: 'center', md: 'flex-start' }} gap='12px' width='100%'>
                <Text
                    data-test-id={DATA_TEST_IDS.userProfileName}
                    textAlign='center'
                    fontWeight='700'
                    fontSize='48px'
                    lineHeight='100%'
                >
                    {`${firstName} ${lastName}`}
                </Text>
                <Typography
                    data-test-id={DATA_TEST_IDS.userProfileLogin}
                    Size={TypographySizes.sm}
                    color='rgba(0, 0, 0, 0.64)'
                >
                    {`@${login}`}
                </Typography>
                <HStack data-test-id={DATA_TEST_IDS.userProfileStatsBlock}>
                    <ReactionCount count={bookmarks || 0} size='small' variant='bookmark' />
                    <ReactionCount
                        count={subscribersCount || 0}
                        size='small'
                        variant='peopleUnfilled'
                    />
                </HStack>
            </VStack>
        </Flex>
    );
};
