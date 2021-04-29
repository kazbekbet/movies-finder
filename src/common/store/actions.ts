import { AppDispatch } from '../../store/rootReducer';
import { clearError, setCurrentRoute, setError } from './commonReducer';
import { RouterPaths } from '../../router/routerPaths';

/** Класс общих экшенов. */
export class CommonActions {
    constructor(private readonly dispatch: AppDispatch) {}

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
}
