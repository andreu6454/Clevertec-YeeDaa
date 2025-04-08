import { AccordionIcon, AccordionPanel, Image } from '@chakra-ui/icons';
import { AccordionButton, AccordionItem, Flex, Text } from '@chakra-ui/react';
import { memo } from 'react';

import { AccordionLink } from '~/components/AccordionLink/AccordionLink';

interface NavbarItemProps {
    title: string;
    icon: string;
    general: string;
    links: Array<{ title: string; link: string }>;
}

export const NavbarItem = memo((props: NavbarItemProps) => {
    const { title, icon, general, links } = props;

    const mappedLinks =
        links?.length > 0
            ? links.map((link, index) => (
                  <AccordionLink
                      title={link.title}
                      key={`${general}-${link.link}${index}`}
                      link={`${general}/${link.link}`}
                  />
              ))
            : null;

    return (
        <AccordionItem
            alignItems='center'
            justifyContent='space-between'
            border='none'
            width='230px'
        >
            <AccordionButton
                padding='12px 8px'
                width='230px'
                height='48px'
                _expanded={{
                    bg: '#eaffc7',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '150%',
                }}
                _hover={{ bg: 'gray.100' }}
                fontWeight='500'
                fontSize='16px'
                lineHeight='150%'
            >
                <Flex as='span' flex='1' textAlign='left' alignItems='center'>
                    <Image marginRight='12px' src={icon} boxSize='24px' />
                    <Text width='150px' color='#000' noOfLines={1}>
                        {title}
                    </Text>
                </Flex>
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
