import { Outlet } from 'react-router';

import { MainLayout } from '~/shared/layouts/MainLayout';
import Header from '~/widgets/header/Header';
import { Navbar } from '~/widgets/navbar/Navbar';
import { Sidebar } from '~/widgets/sidebar/Sidebar';

export const WithMainLayout = () => (
    <MainLayout
        data-test-id='app'
        header={<Header />}
        navbar={<Navbar />}
        content={<Outlet />}
        sidebar={<Sidebar />}
    />
);
