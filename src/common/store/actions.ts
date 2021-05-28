import { AppDispatch } from '../../store/rootReducer';
import {
    clearError,
    getCurrencyFulfilled,
    getCurrencyPending,
    getCurrencyRejected,
    setCurrentRoute,
    setError,
} from './commonReducer';
import { RouterPaths } from '../../router/routerPaths';
import { CommonServices } from '../services/services';

/** Класс общих экшенов. */
export class CommonActions {
    constructor(private readonly dispatch: AppDispatch) {}

    services = new CommonServices();

    /** Установка ошибки. */
    public setError = (errorText: string) => {
        this.dispatch(setError(errorText));
    };

    /** Очистка сообщения об ошибке. */
    public clearError = () => {
        this.dispatch(clearError());
    };

    /** Запись текущего роута в стейт. */
    public setCurrentRoute = (route: RouterPaths) => {
        this.dispatch(setCurrentRoute(route));
    };

    /** Получение данных о текущем курсе USD. */
    public getUSDCurrencyRate = async () => {
        try {
            this.dispatch(getCurrencyPending());
            const response = await this.services.getUSDCurrencyRate();
            this.dispatch(getCurrencyFulfilled(response.data));
        } catch (e) {
            this.setError('Ошибка получения курса USD.');
            this.dispatch(getCurrencyRejected());
        }
    };
}
