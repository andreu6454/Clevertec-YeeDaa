import { Box } from '@chakra-ui/icons';
import { Avatar, Flex, Image, Link, Text } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router';

import LoginIcon from '~/assets/svg/login.svg';
import { useGetProfileQuery } from '~/query/services/users';
import { DATA_TEST_IDS } from '~/shared/constants/dataTestIds';
import { APP_PATHS } from '~/shared/constants/pathes';
import { getImageUrl } from '~/shared/services/getImageUrl';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';
import { useAppSelector } from '~/store/hooks';
import { userIdSelector } from '~/store/slices/app-slice';

export const HeaderProfileBlock = () => {
    const isLogin = useAppSelector(userIdSelector);

    const { data } = useGetProfileQuery();

    if (!data || !isLogin)
        return (
            <Flex paddingRight='56px' flexShrink={0} alignItems='center' justifyContent='flex-end'>
                <Link as={ReactLink} to={APP_PATHS.login}>
                    <Flex padding='6px 12px' alignItems='center' gap='8px'>
                        <Typography fontWeight={600} Size={TypographySizes.sm}>
                            Log in
                        </Typography>
                        <Image width='14px' height='14px' src={LoginIcon} />
                    </Flex>
                </Link>
            </Flex>
        );
    return (
        <Flex
            marginRight='56px'
            flexShrink={0}
            padding='0 24px 0 53px'
            justifyContent='end'
            alignItems='center'
            gap='12px'
            height='48px'
        >
            <Link as={ReactLink} to={APP_PATHS.profile}>
                <Avatar
                    name={`${data?.firstName} ${data?.lastName}`}
                    src={getImageUrl(data?.photoLink)}
                />
            </Link>
            <Link
                data-test-id={DATA_TEST_IDS.headerProfileButton}
                as={ReactLink}
                to={APP_PATHS.profile}
            >
                <Box height='48px'>
                    <Text fontWeight={500} fontSize='18px' lineHeight='156%' color='black'>
                        {`${data?.firstName} ${data?.lastName}`}
                    </Text>
                    <Text
                        fontWeight={400}
                        fontSize='14px'
                        lineHeight='143%'
                        color='rgba(0, 0, 0, 0.64)'
                    >
                        {data?.login}
                    </Text>
                </Box>
            </Link>
        </Flex>
    );
};
