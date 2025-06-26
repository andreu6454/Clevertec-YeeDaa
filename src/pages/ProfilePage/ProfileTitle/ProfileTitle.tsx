import { IconButton, SettingsIcon } from '@chakra-ui/icons';
import { Avatar, Flex, HStack, Text, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router';

import { useGetStatisticQuery } from '~/query/services/users';
import { APP_PATHS } from '~/shared/constants/pathes';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { ReactionCount } from '~/shared/ui/ReactionCount/ReactionCount';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

type ProfileTitleProps = {
    firstName: string;
    lastName: string;
    login: string;
    photoLink?: string;
};

export const ProfileTitle = ({ firstName, lastName, login, photoLink }: ProfileTitleProps) => {
    const { data: StatisticData } = useGetStatisticQuery();

    const navigate = useNavigate();

    const likes = StatisticData?.likes?.reduce((acc, item) => acc + item.count, 0);
    const bookmarks = StatisticData?.bookmarks?.reduce((acc, item) => acc + item.count, 0);

    const onClickHandler = () => {
        navigate(APP_PATHS.profileSettings);
    };

    return (
        <Flex
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems='center'
            paddingY='16px'
            gap='24px'
            width='100%'
        >
            <Avatar size='2xl' name={`${firstName} ${lastName}`} src={getImageUrl(photoLink)} />
            <IconButton
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
                <Text textAlign='center' fontWeight='700' fontSize='48px' lineHeight='100%'>
                    {`${firstName} ${lastName}`}
                </Text>
                <Typography Size={TypographySizes.sm} color='rgba(0, 0, 0, 0.64)'>
                    {`@${login}`}
                </Typography>
                <HStack>
                    <ReactionCount count={bookmarks || 0} size='small' variant='bookmark' />
                    <ReactionCount count={likes || 0} size='small' variant='peopleUnfilled' />
                </HStack>
            </VStack>
        </Flex>
    );
};
