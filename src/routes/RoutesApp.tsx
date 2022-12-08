import { useRoutes } from 'react-router-dom';
// project import
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoute';

const RoutesApp = () => useRoutes([MainRoutes, LoginRoutes]);

export default RoutesApp;
