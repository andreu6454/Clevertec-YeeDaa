import { Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { JuiciestFood } from '~/pages/JuiciestFood/JuiciestFood';
import { MainPage } from '~/pages/MainPage/MainPage.tsx';
import { VeganPage } from '~/pages/VeganPage/VeganPage';

export const AppRouter = () => (
    <Suspense fallback={<div>sdf</div>}>
        <Routes>
            <Route index element={<MainPage />} />
            <Route path='/vegan' element={<VeganPage />} />
            <Route path='/juiciest' element={<JuiciestFood />} />
        </Routes>
    </Suspense>
);
