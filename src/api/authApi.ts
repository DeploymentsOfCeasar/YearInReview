import Admin from '../models/admin';
import { Token } from '../models/state';
import axiosClient from './axiosClient';
import { BASE_URL } from './constants';

type Login = Admin & Token;

const authApi = {
    login: (params: Admin): Promise<Login> => axiosClient.post(`${BASE_URL}/admin`, params),
    checkToken: () => axiosClient.post(`${BASE_URL}/admin/check-token`),
};

export default authApi;
