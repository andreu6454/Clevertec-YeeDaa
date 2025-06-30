import { Tab, TabList } from '@chakra-ui/icons';
import { Tabs } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

import { SubCategoryType } from '~/shared/types/categoryTypes';

interface LinksCarouselProps {
    links: SubCategoryType[];
    category: string;
}

export const LinksCarousel = (props: LinksCarouselProps) => {
    const { links, category } = props;

    const [activeIndex, setActiveIndex] = useState<number>();
    const [tabIndex, setTabIndex] = useState(activeIndex);

    const location = useLocation();
    const navigate = useNavigate();
    const currentPath = location.pathname.split('/')[2];

    useEffect(() => {
        const currentIndex = links.findIndex((link) => link.category === currentPath);
        setActiveIndex(currentIndex);
        setTabIndex(currentIndex);
    }, [currentPath, links]);

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
            alignItems={{ base: 'flex-start', xl: 'center' }}
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
                            padding={{ base: '4px 16px', xl: '8px 16px' }}
                            borderBottom={isActive ? '2px solid #' : ''}
                            color='#134b00'
                            fontWeight='500'
                            fontSize={{ base: '14px', xl: '16px' }}
                            lineHeight={{ base: '143%', xl: '150%' }}
                        >
                            {link.title}
                        </Tab>
                    );
                })}
            </TabList>
        </Tabs>
    );
};
