import axios from 'axios';
import { ApiConfig } from './config';
import { CurrencyTypes } from '../enums/currency';

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

export const GET_CURRENCY_RATE = (currency: CurrencyTypes) => {
    return axios({
        method: 'get',
        url: `https://v6.exchangerate-api.com/v6/534045ffbfd93c62601b33b9/latest/${currency}`,
    });
};
