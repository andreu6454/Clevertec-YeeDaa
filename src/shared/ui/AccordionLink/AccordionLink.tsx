import { Box, Link } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

interface AccordionLinkProps {
    title: string;
    link: string;
    linkforTest: string;
}

export const AccordionLink = ({ title, link, linkforTest }: AccordionLinkProps) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(link, { replace: true });
    };

    if (location.pathname === `/${link}`) {
        return (
            <Flex
                data-test-id={`${linkforTest}-active`}
                width='240px'
                height='36px'
                padding='6px 8px 6px 33px'
                gap='11px'
                alignItems='center'
                flexDirection='row'
            >
                <Box width='8px' height='28px' backgroundColor='#c4ff61' />
                <Link
                    onClick={handleClick}
                    width='180px'
                    height='24px'
                    fontWeight='700'
                    fontSize='16px'
                    lineHeight='150%'
                    whiteSpace='nowrap'
                    overflow='hidden'
                    textOverflow='ellipsis'
                >
                    {title}
                </Link>
            </Flex>
        );
    }
    return (
        <Flex
            width='240px'
            height='36px'
            padding='6px 8px 6px 40px'
            gap='11px'
            alignItems='center'
            flexDirection='row'
        >
            <Box width='1px' height='28px' backgroundColor='#c4ff61' />
            <Link
                onClick={handleClick}
                width='180px'
                height='24px'
                fontWeight='500'
                fontSize='16px'
                lineHeight='150%'
                whiteSpace='nowrap'
                overflow='hidden'
                textOverflow='ellipsis'
            >
                {title}
            </Link>
        </Flex>
    );
};
