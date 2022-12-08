// Project import
import { lazy } from 'react';
import { Loadable } from '../components';
import MainLayout from '../layout/main-layout/MainLayout';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/DashboardDefault')));
const YearHighlights = Loadable(lazy(() => import('../pages/year-highlights/YearHighlights')));

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <DashboardDefault />,
        },
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <DashboardDefault />,
                },
            ],
        },
        {
            path: '2021',
            element: <YearHighlights />,
        },
        {
            path: '2022',
            element: <YearHighlights />,
        },
    ],
};

export default MainRoutes;
