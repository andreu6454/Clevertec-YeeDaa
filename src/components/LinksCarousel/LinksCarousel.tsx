import { Box } from '@chakra-ui/icons';
import { Flex, Link } from '@chakra-ui/react';
import { useLocation } from 'react-router';

interface LinksCarouselProps {
    links: Array<{ title: string; link: string }>;
    size: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile';
}

const sizes = {
    Desktop: {
        padding: '8px 16px',
        fontSize: '16px',
        lineHeight: '150%',
    },
    Laptop: {
        padding: '8px 16px',
        fontSize: '16px',
        lineHeight: '150%',
    },
    Tablet: {
        padding: '4px 16px',
        fontSize: '14px',
        lineHeight: '143%',
    },
    Mobile: {
        padding: '4px 16px',
        fontSize: '14px',
        lineHeight: '143%',
    },
};
export const LinksCarousel = (props: LinksCarouselProps) => {
    const location = useLocation();

    const currentPath = location.pathname.split('/')[2];

    const { links, size } = props;

    return (
        <Box
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
            width='100%'
            overflowX='scroll'
            borderBottom='1px solid rgba(0, 0, 0, 0.08)'
            mb='12px'
        >
            <Flex
                gap={4}
                px={6}
                justify='center'
                alignItems={size === 'Desktop' || size === 'Laptop' ? 'center' : 'flex-start'}
            >
                {links.map((link) => {
                    const isActive = currentPath === link.link;

                    return (
                        <Link
                            key={link.link}
                            href={link.link}
                            whiteSpace='nowrap'
                            padding={sizes[size].padding}
                            borderBottom={isActive ? '2px solid #2db100' : ''}
                            color={isActive ? '#2db100' : '#134b00'}
                            transition='all 0.2s'
                            fontWeight='500'
                            fontSize={sizes[size].fontSize}
                            lineHeight={sizes[size].lineHeight}
                        >
                            {link.title}
                        </Link>
                    );
                })}
            </Flex>
        </Box>
    );
};
