import './App.css';

import { AppRouter } from '~/app/router/AppRouter';
import { useScreenSize } from '~/shared/hooks/useScreenSize';
import { DesktopLaptopLayout } from '~/shared/layouts/DesktopLaptopLayout';
import { MobileLayout } from '~/shared/layouts/MobileLayout';
import Footer from '~/widgets/footer/Footer';
import Header from '~/widgets/header/Header';
import { Navbar } from '~/widgets/navbar/Navbar';
import { Sidebar } from '~/widgets/sidebar/Sidebar';

function App() {
    const { isDesktop, isLaptop } = useScreenSize();

    return isDesktop || isLaptop ? (
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
