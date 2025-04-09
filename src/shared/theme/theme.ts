import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            '::-webkit-scrollbar': {
                width: '8px',
                background: 'transparent',
            },
            '::-webkit-scrollbar-track': {
                bg: 'rgba(0, 0, 0, 0.04)',
            },
            '::-webkit-scrollbar-thumb': {
                bg: 'rgba(0, 0, 0, 0.16)',
                borderRadius: '8px',
            },
        },
    },
});
