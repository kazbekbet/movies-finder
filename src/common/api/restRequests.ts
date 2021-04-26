import axios from 'axios';
import { ApiConfig } from './config';

interface IGetRequest<T> {
    url: string;
    params?: T;
}

export const GET = <T>(request: IGetRequest<T>) => {
    return axios({
        method: 'get',
        url: `${ApiConfig.BASE_URL}${request.url}`,
        params: {
            api_key: ApiConfig.API_KEY,
            language: ApiConfig.LANGUAGE,
            ...request.params,
        },
    });
};
