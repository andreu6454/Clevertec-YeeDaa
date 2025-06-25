import { Avatar, AvatarBadge, Flex, Icon } from '@chakra-ui/react';

import { getImageUrl } from '~/shared/services/getImageUrl';

type AvatarInputProps = {
    avatar: string;
};

export const AvatarInput = ({ avatar }: AvatarInputProps) => {
    const avatarSrc = avatar ? getImageUrl(avatar) : undefined;

    return (
        <Avatar size='2xl' src={avatarSrc} backgroundColor='rgba(0, 0, 0, 0.24)'>
            <AvatarBadge borderColor='#fff' boxSize='28px' top={24} right={3}>
                <Flex
                    flexShrink={0}
                    backgroundColor='#000'
                    borderRadius='50%'
                    width='24px'
                    height='24px'
                    alignItems='center'
                    justifyContent='center'
                >
                    <Icon
                        stroke='#ffffd3'
                        fill='#ffffd3'
                        viewBox='0 0 32 28'
                        width='12px'
                        height='12px'
                    >
                        <path d='M0.00402832 4C0.00402832 2.93913 0.425456 1.92172 1.1756 1.17157C1.92575 0.421427 2.94316 0 4.00403 0H28.004C29.0649 0 30.0823 0.421427 30.8325 1.17157C31.5826 1.92172 32.004 2.93913 32.004 4V24C32.004 25.0609 31.5826 26.0783 30.8325 26.8284C30.0823 27.5786 29.0649 28 28.004 28H4.00403C2.94316 28 1.92575 27.5786 1.1756 26.8284C0.425456 26.0783 0.00402832 25.0609 0.00402832 24V4ZM2.00403 22V24C2.00403 24.5304 2.21474 25.0391 2.58981 25.4142C2.96489 25.7893 3.4736 26 4.00403 26H28.004C28.5345 26 29.0432 25.7893 29.4182 25.4142C29.7933 25.0391 30.004 24.5304 30.004 24V17L22.45 13.106C22.2625 13.012 22.0501 12.9795 21.843 13.0128C21.6359 13.0462 21.4446 13.1439 21.296 13.292L13.876 20.712L8.55603 17.168C8.36395 17.0401 8.13355 16.9826 7.90391 17.0052C7.67426 17.0278 7.45949 17.1291 7.29603 17.292L2.00403 22ZM12.004 9C12.004 8.20435 11.688 7.44129 11.1253 6.87868C10.5627 6.31607 9.79968 6 9.00403 6C8.20838 6 7.44532 6.31607 6.88271 6.87868C6.3201 7.44129 6.00403 8.20435 6.00403 9C6.00403 9.79565 6.3201 10.5587 6.88271 11.1213C7.44532' />
                    </Icon>
                </Flex>
            </AvatarBadge>
        </Avatar>
    );
};
