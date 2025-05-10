import { Tab, TabList } from '@chakra-ui/icons';
import { Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { SubCategoryType } from '~/shared/types/categoryTypes';

interface LinksCarouselProps {
    links: SubCategoryType[];
    size: 'Desktop' | 'Laptop' | 'Tablet' | 'Mobile';
    category: string;
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
    const { links, size, category } = props;

    const [activeIndex, setActiveIndex] = useState<number>();

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname.split('/')[2];

    useEffect(() => {
        const currentIndex = links.findIndex((link) => link.category === currentPath);
        setActiveIndex(currentIndex);
    }, [currentPath, links]);

    const [tabIndex, setTabIndex] = useState(activeIndex);

    const handleTabsChange = (index: number) => {
        setTabIndex(index);
        navigate(`/${category}/${links[index].category}`);
    };

    return (
        <Tabs
            variant='unstyled'
            index={tabIndex}
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
            onChange={handleTabsChange}
            alignItems={size === 'Desktop' || size === 'Laptop' ? 'center' : 'flex-start'}
        >
            <TabList>
                {links.map((link, index) => {
                    const isActive = activeIndex === index;
                    return (
                        <Tab
                            data-test-id={`tab-${link.category}-${index}`}
                            _selected={{
                                color: '#2db100',
                                borderBottom: '2px solid #2db100',
                            }}
                            key={link.category}
                            whiteSpace='nowrap'
                            padding={sizes[size].padding}
                            borderBottom={isActive ? '2px solid #' : ''}
                            color='#134b00'
                            fontWeight='500'
                            fontSize={sizes[size].fontSize}
                            lineHeight={sizes[size].lineHeight}
                        >
                            {link.title}
                        </Tab>
                    );
                })}
            </TabList>
        </Tabs>
    );
};
