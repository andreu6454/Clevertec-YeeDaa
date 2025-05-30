import './App.css';

import { RouterProvider } from 'react-router';

import { AppRouter } from '~/app/router/AppRouter';

function App() {
    return <RouterProvider router={AppRouter} />;
}

export default App;
