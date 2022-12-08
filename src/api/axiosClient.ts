import axios, { AxiosRequestConfig, AxiosResponse, ParamsSerializerOptions } from 'axios';
import querystring from 'query-string';
import { BASE_URL } from './constants';

const getToken = () => localStorage.getItem('token');

const axiosClient = axios.create({
    baseURL: BASE_URL,
    // paramsSerializer: (params: ParamsSerializerOptions): string => querystring.stringify(params),
});

axiosClient.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        return {
            ...config,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`,
            },
            paramsSerializer: {
                encode: (params) => {
                    console.log('params =>', params);

                    return querystring.stringify(params);
                },
            },
        };
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosClient.interceptors.response.use(
    (response: AxiosResponse) => {
        if (response && response.data) {
            return response.data;
        }

        return response.data;
    },
    (error) => {
        throw error;
    }
);

export default axiosClient;
