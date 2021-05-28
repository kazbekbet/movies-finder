import { GET_CURRENCY_RATE } from '../api/restRequests';
import { CurrencyTypes } from '../enums/currency';
import { AxiosPromise } from 'axios';
import { CurrencyModel } from '../store/model';

export class CommonServices {
    /** Получение данных о текущем курсе USD. */
    getUSDCurrencyRate = (): AxiosPromise<CurrencyModel> => GET_CURRENCY_RATE(CurrencyTypes.USD);
}
