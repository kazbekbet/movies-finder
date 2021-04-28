import { AppDispatch } from '../../store/rootReducer';
import { clearError, setCurrentRoute, setError } from './commonReducer';
import { RouterPaths } from '../../router/routerPaths';

/** Класс общих экшенов. */
export class CommonActions {
    constructor(private readonly dispatch: AppDispatch) {}

    public setError = (errorText: string) => {
        this.dispatch(setError(errorText));
    };

    public clearError = () => {
        clearError();
    };

    public setCurrentRoute = (route: RouterPaths) => {
        this.dispatch(setCurrentRoute(route));
    };
}
