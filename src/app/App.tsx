import './App.css';

import { useMediaQuery } from '@chakra-ui/icons';

import { AppRouter } from '~/router/AppRouter';
import { DesktopLaptopLayout } from '~/shared/layouts/DesktopLaptopLayout';
import { MobileLayout } from '~/shared/layouts/MobileLayout';
import Footer from '~/widgets/footer/Footer';
import Header from '~/widgets/header/Header';
import { Navbar } from '~/widgets/navbar/Navbar';
import { Sidebar } from '~/widgets/sidebar/Sidebar';

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
