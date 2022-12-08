import { NavigateFunction } from 'react-router-dom';
import authApi from '../api/authApi';

const isAuthenticated = async () => {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
        await authApi.checkToken();
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const logOut = (navigate: NavigateFunction) => {
    localStorage.removeItem('token');
    navigate('/login');
};

export { isAuthenticated };
