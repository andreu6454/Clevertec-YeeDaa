import { Flex, Image, Link } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { APP_PATHS } from '~/shared/constants/pathes';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const AllBlogsLink = () => (
    <Link padding='8px 16px' as={ReactRouterLink} to={APP_PATHS.blogs}>
        <Flex gap='8px' alignItems='center'>
            <Typography Size={TypographySizes.md} fontWeight='600'>
                Все авторы
            </Typography>
            <Image src={ArrowRightIcon} />
        </Flex>
    </Link>
);
