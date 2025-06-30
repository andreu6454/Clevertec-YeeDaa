import { Flex, Image, Link } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router';

import ArrowRightIcon from '~/assets/svg/BsArrowRight.svg';
import { Typography, TypographySizes } from '~/shared/ui/Typography/Typography';

export const AboutProject = () => (
    <Flex flexDirection='column' gap='16px'>
        <Typography Size={TypographySizes.xl} fontWeight={700}>
            О проекте
        </Typography>
        <Flex gap='8px' alignItems='center'>
            <Typography Size={TypographySizes.md}>Связаться с</Typography>
            <Link as={ReactLink} to='https://clevertec.ru/' textDecoration='underline'>
                разработчиками
            </Link>
            <Image src={ArrowRightIcon} />
        </Flex>
    </Flex>
);
