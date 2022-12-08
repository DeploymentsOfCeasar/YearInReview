import axiosClient from './axiosClient';
import { BASE_URL } from './constants';
import { AYearState, AQuarterState, AMonthState, AWeekState } from '../models/state';

const stateApi = {
    getAllYear: (): Promise<AYearState[]> => axiosClient.get(`${BASE_URL}/state/year`),

    getOneYear: (id: string): Promise<AYearState[]> =>
        axiosClient.get(`${BASE_URL}/state/year/${id}`),

    getAllQuarterOfAYear: (id: number): Promise<AQuarterState[]> =>
        axiosClient.get(`${BASE_URL}/state/quarter/${id}`),

    getAllMonthOfAQuarter: (id: string): Promise<AMonthState> =>
        axiosClient.get(`${BASE_URL}/state/month/${id}`),

    getAllMonthOfAYear: (id: string): Promise<AMonthState[]> =>
        axiosClient.get(`${BASE_URL}/state/month/${id}`),

    getAllWeekdayOfAYear: (id: string): Promise<AWeekState[]> =>
        axiosClient.get(`${BASE_URL}/state/week/${id}`),
};

export default stateApi;
