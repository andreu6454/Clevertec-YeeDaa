import { Route, Routes } from 'react-router';

import { JuiciestFood } from '~/pages/JuiciestFood/JuiciestFood';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import { NavBarData } from '~/shared/data/navBarData';

import { createRoutes } from './routeComponents';

export const AppRouter = () => (
    <Routes>
        <Route index element={<MainPage />} />
        {createRoutes({ data: NavBarData })}
        <Route path='/juiciest' element={<JuiciestFood />} />
        {/*<Route path='*' element={<div>404</div>}/>*/}
    </Routes>
);
