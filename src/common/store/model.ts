import { RouterPaths } from '../../router/routerPaths';
import { CurrencyTypes } from '../enums/currency';
import { PromiseStatuses } from '../enums/asyncActionStatuses';
import { Nullable } from '../models/additional';

export interface CommonReducer {
    isError: boolean;
    errorText: string;
    currentRoute: Nullable<RouterPaths>;
    currencyStatus: PromiseStatuses;
    currencyResult: Nullable<CurrencyModel>;
    genresStatus: PromiseStatuses;
    genres: Nullable<Genre[]>;
}

export interface CurrencyModel {
    result: string;
    base_code: CurrencyTypes;
    conversion_rates: {
        [CurrencyTypes.EUR]: number;
        [CurrencyTypes.RUB]: number;
    };
}

export interface GenreResponse {
    genres: Genre[];
}

export interface Genre {
    id: number;
    name: string;
}
