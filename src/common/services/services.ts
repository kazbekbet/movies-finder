import { GET, GET_CURRENCY_RATE } from '../api/restRequests';
import { CurrencyTypes } from '../enums/currency';
import { AxiosPromise } from 'axios';
import { CurrencyModel, GenreResponse } from '../store/model';

export class CommonServices {
    /** Получение данных о текущем курсе USD. */
    getUSDCurrencyRate = (): AxiosPromise<CurrencyModel> => GET_CURRENCY_RATE(CurrencyTypes.USD);

    /** Получение списка всех жанров. */
    getGenres = (): AxiosPromise<GenreResponse> => GET({ url: '/genre/movie/list' });
}
