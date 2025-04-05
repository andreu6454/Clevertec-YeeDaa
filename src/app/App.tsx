import './App.css';

import { useMediaQuery } from '@chakra-ui/icons';

import Footer from '~/components/footer/Footer';
import Header from '~/components/header/Header';
import { Navbar } from '~/components/navbar/Navbar';
import { Sidebar } from '~/components/sidebar/Sidebar';
import { DesktopLaptopLayout } from '~/layouts/DesktopLaptopLayout';
import { MobileLayout } from '~/layouts/MobileLayout';
import { AppRouter } from '~/router/AppRouter';

function App() {
    const [isDesktopOrLaptop] = useMediaQuery('(min-width: 1440px)');

    return isDesktopOrLaptop ? (
        <DesktopLaptopLayout
            data-test-id='app'
            header={<Header />}
            navbar={<Navbar />}
            content={<AppRouter />}
            sidebar={<Sidebar />}
        />
    ) : (
        <MobileLayout
            data-test-id='app'
            header={<Header />}
            content={<AppRouter />}
            footer={<Footer />}
        />
    );
}

export default App;
