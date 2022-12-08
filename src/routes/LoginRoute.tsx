import {lazy} from 'react'
// project import
import MinimalLayout from '../layout/minimal-layout/MinimalLayout'
import { Loadable } from '../components';

// render - login
const AuthLogin = Loadable(lazy(() => import('../pages/authentication/Login')))

const LoginRoute = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        }
    ]
};

export default LoginRoute;
