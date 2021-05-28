import { RouterPaths } from '../../router/routerPaths';
import { CurrencyTypes } from '../enums/currency';
import { PromiseStatuses } from "../enums/asyncActionStatuses";

export interface CommonReducer {
    isError: boolean;
    errorText: string;
    currentRoute: RouterPaths | null;
    currencyStatus: PromiseStatuses;
    currencyResult: CurrencyModel | null;
}

export interface CurrencyModel {
    result: string;
    base_code: CurrencyTypes;
    conversion_rates: {
        [CurrencyTypes.EUR]: number;
        [CurrencyTypes.RUB]: number;
    };
}
