import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router';

import App from '~/app/App.tsx';
import { theme } from '~/shared/theme/theme';
import { store } from '~/store/configure-store.ts';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <ChakraProvider theme={theme}>
                <Provider store={store}>
                    <App />
                </Provider>
            </ChakraProvider>
        </BrowserRouter>
    </StrictMode>,
);
