import { Tab, TabList } from '@chakra-ui/icons';
import { Tabs } from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router';

import { useScreenSize } from '~/shared/hooks/useScreenSize';

const sizes = {
    Desktop: {
        mt: '80px',
        fontSize: '18px',
        lineHeight: '156%',
        padding: '12px 24px',
    },
    Laptop: {
        mt: '80px',
        fontSize: '18px',
        lineHeight: '156%',
        padding: '12px 24px',
    },
    Tablet: {
        mt: '56px',
        fontSize: '16px',
        lineHeight: '150%',
        padding: '8px 24px',
    },
    Mobile: {
        mt: '40px',
        fontSize: '16px',
        lineHeight: '150%',
        padding: '8px 24px',
    },
};

export const AuthLinks = () => {
    const { screenSize } = useScreenSize();

    const path = useLocation();
    const navigate = useNavigate();

    const activeIndex = path.pathname === '/login' ? 0 : 1;

    const onLoginClick = () => {
        navigate('/login');
    };
    const onRegisterClick = () => {
        navigate('/register');
    };

    return (
        <Tabs
            marginTop={sizes[screenSize].mt}
            marginBottom='40px'
            index={activeIndex}
            variant='unstyled'
            sx={{
                scrollbarWidth: 'none',
                '&::-webkit-scrollbar': {
                    display: 'none',
                },
            }}
            width='100%'
            overflowX='scroll'
            borderBottom='1px solid rgba(0, 0, 0, 0.08)'
        >
            <TabList>
                <Tab
                    onClick={onLoginClick}
                    _selected={{
                        borderBottom: '2px solid #207e00',
                    }}
                    padding={sizes[screenSize].padding}
                    color='#207e00'
                    fontWeight='500'
                    fontSize={sizes[screenSize].fontSize}
                    lineHeight={sizes[screenSize].lineHeight}
                >
                    Вход на сайт
                </Tab>
                <Tab
                    onClick={onRegisterClick}
                    _selected={{
                        borderBottom: '2px solid #207e00',
                    }}
                    padding={sizes[screenSize].padding}
                    color='#207e00'
                    fontWeight='500'
                    fontSize={sizes[screenSize].fontSize}
                    lineHeight={sizes[screenSize].lineHeight}
                >
                    Регистрация
                </Tab>
            </TabList>
        </Tabs>
    );
};
