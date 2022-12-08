import axiosClient from './axiosClient';
import { BASE_URL } from './constants';
import { AverageHighlights, QuarterComparionHighlights } from '../models/highlights';

const highlightsApi = {
    getAverageOfYear: (id: string): Promise<AverageHighlights> =>
        axiosClient.get(`${BASE_URL}/highlight/year/${id}`),
    getComparisonInQuarters: (): Promise<QuarterComparionHighlights> =>
        axiosClient.get(`${BASE_URL}/highlight/quarter`),
};

export default highlightsApi;
