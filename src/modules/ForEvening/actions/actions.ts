import { AppDispatch } from '../../../store/rootReducer';
import { ForEveningServices } from '../services/services';
import { ForEveningSearchRequest } from '../store/models';
import * as actions from '../store/reducer';
import { CommonActions } from '../../../common/store/actions';
import { LocalStorage } from '../../../common/localStorage/LocalStorage';
import { ELocalStorage } from '../../../common/enums/localStorage';
import { IMovieShortInfo } from '../../MoviesList/store/models';

export class ForEveningActions {
    constructor(private readonly services: ForEveningServices, private readonly dispatch: AppDispatch) {}

    private localStorage = new LocalStorage();
    private commonActions = new CommonActions(this.dispatch);

    /** Получение списка фильмов согласно фильтру. */
    getMovies = async (request: ForEveningSearchRequest) => {
        const { dispatch, services, commonActions } = this;
        const { getMoviesPending, getMoviesFulfilled, getMoviesRejected } = actions;

        try {
            dispatch(getMoviesPending());
            const { data } = await services.getMoviesList(request);
            dispatch(getMoviesFulfilled(data));
        } catch (e) {
            commonActions.setError('Произошла ошибка поиска фильмов. Попробуйте позже.');
            dispatch(getMoviesRejected());
        }
    };

    /** История поисков "Фильм на вечер" */
    getHistory = async () => {
        const { dispatch, localStorage, commonActions } = this;
        const { getHistoryPending, getHistoryFulfilled, getHistoryRejected } = actions;

        try {
            dispatch(getHistoryPending());
            const response = await localStorage.getData<IMovieShortInfo[]>(ELocalStorage.FOR_EVENING_HISTORY);
            dispatch(getHistoryFulfilled(response));
        } catch (e) {
            commonActions.setError('Произошла ошибка загрузки истории поиска. Попробуйте позже.');
            dispatch(getHistoryRejected());
        }
    };

    /** Сохраняет фильм в локальное хранилище. */
    setMovieToHistory = async (movie: IMovieShortInfo) => {
        const { localStorage, commonActions } = this;

        try {
            await localStorage.setItemToArray(movie, ELocalStorage.FOR_EVENING_HISTORY);
            await this.getHistory();
        } catch (e) {
            commonActions.setError('Произошла ошибка записи фильма в хранилище.');
        }
    };

    /** Очищает историю поиска. */
    clearHistory = async () => {
        const { localStorage, commonActions } = this;

        try {
            await localStorage.deleteAllDataByKey(ELocalStorage.FOR_EVENING_HISTORY);
            await this.getHistory();
        } catch (e) {
            commonActions.setError('Произошла ошибка очищения хранилища.');
        }
    };
}
