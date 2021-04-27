import { AppDispatch } from '../../store/rootReducer';
import { clearError, setError } from './commonReducer';

/** Класс общих экшенов. */
export class CommonActions {
    constructor(private readonly dispatch: AppDispatch) {}

    public setError = (errorText: string) => {
        this.dispatch(setError(errorText));
    };

    public clearError = () => {
        clearError();
    };
}
