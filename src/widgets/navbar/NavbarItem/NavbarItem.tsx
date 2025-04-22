import { AccordionIcon, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, AccordionItem, Flex, Link, Text } from '@chakra-ui/react';
import { memo } from 'react';
import { useNavigate } from 'react-router';

import { AccordionLink } from '~/shared/ui/AccordionLink/AccordionLink';

interface NavbarItemProps {
    title: string;
    icon: string;
    general: string;
    links: Array<{ title: string; link: string }>;
    isDesktopLaptop: boolean;
}

export const NavbarItem = memo((props: NavbarItemProps) => {
    const { title, icon, general, links, isDesktopLaptop } = props;
    const navigate = useNavigate();

    const mappedLinks = links.map((link, index) => (
        <AccordionLink
            title={link.title}
            key={`${general}-${link.link}${index}`}
            link={`${general}/${link.link}`}
            linkforTest={link.link}
        />
    ));
    const handleClick = () => {
        navigate(general, { replace: true });
    };

    return (
        <AccordionItem border='none' width={isDesktopLaptop ? '230px' : '302px'}>
            <AccordionButton
                padding='12px 8px'
                width={isDesktopLaptop ? '230px' : '302px'}
                height='48px'
                _expanded={{
                    bg: '#eaffc7',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '150%',
                }}
                fontWeight='500'
                fontSize='16px'
                lineHeight='150%'
            >
                <Link
                    textDecoration='none'
                    data-test-id={general === 'vegan' ? 'vegan-cuisine' : ''}
                >
                    <Flex
                        as='span'
                        flex='1'
                        textAlign='left'
                        alignItems='center'
                        onClick={handleClick}
                    >
                        <Image marginRight='12px' src={icon} boxSize='24px' />
                        <Text
                            data-test-id='${category}'
                            width={isDesktopLaptop ? '150px' : '222px'}
                            color='#000'
                            noOfLines={1}
                        >
                            {title}
                        </Text>
                    </Flex>
                </Link>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel padding='0'>
                <Flex direction='column' width='240px'>
                    {mappedLinks}
                </Flex>
            </AccordionPanel>
        </AccordionItem>
    );
});
