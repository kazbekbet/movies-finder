import { AppDispatch } from '../../../store/rootReducer';
import { MovieInfoServices } from '../services/services';
import { CommonActions } from '../../../common/store/actions';
import {
    clearMovieInfoData,
    getMovieInfoFulfilled,
    getMovieInfoPending,
    getMovieInfoRejected,
    getMovieTrailerFulfilled,
    getMovieTrailerPending,
    getMovieTrailerRejected,
    getSimilarMoviesFulfilled,
    getSimilarMoviesPending,
    getSimilarMoviesRejected,
} from '../store/reducer';
import { IMovieInfoResult } from '../store/models';
import { ELocalStorage } from '../../../common/enums/localStorage';
import { ErrorsLocalization } from '../../../common/enums/errorsLocalization';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { localStorageUtils } from '../../../common/localStorage/LocalStorage';

/** Экшены компонента информации о фильме. */
export class MovieInfoActions {
    constructor(private readonly services: MovieInfoServices, private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);
    private localStorage = localStorageUtils;

    /** Получение информации о фильме. */
    public getMovieInfo = async (id: number) => {
        try {
            this.dispatch(getMovieInfoPending());
            const response = await this.services.getMovieInfo(id);
            this.dispatch(getMovieInfoFulfilled(response.data));
        } catch (e) {
            this.commonActions.setError('Произошла ошибка загрузки данных. Попробуйте зайти позже.');
            this.dispatch(getMovieInfoRejected());
        }
    };

    /** Очистка данных о фильме. */
    public clearMovieInfoData = () => {
        this.dispatch(clearMovieInfoData());
    };

    /** Запись фильма в локальное хранилище. */
    public setMovieToLocalStorage = async (movie: IMovieShortInfo) => {
        try {
            await this.localStorage.setItemToArray<IMovieShortInfo>(movie, ELocalStorage.FAVOURITES_MOVIES);
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.MOVIE_SAVING);
        }
    };

    /** Получение списка фильмов. */
    public getMoviesFromLocalStorage = async () => {
        try {
            return await this.localStorage.getData<IMovieShortInfo[]>(ELocalStorage.FAVOURITES_MOVIES);
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.GET_SAVED_MOVIE);
        }
    };

    /** Удаление фильма из списка. */
    public removeMovieFromLocalStorage = async (movie: IMovieInfoResult) => {
        try {
            await this.localStorage.removeItemFromArray<IMovieShortInfo>(
                ELocalStorage.FAVOURITES_MOVIES,
                storedMovie => storedMovie.id === movie.id
            );
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.REMOVE_SAVED_MOVIE);
        }
    };

    public removeMovieFromLocalStorageById = async (id: number) => {
        try {
            await this.localStorage.removeItemFromArray<IMovieShortInfo>(
                ELocalStorage.FAVOURITES_MOVIES,
                storedMovie => storedMovie.id === id
            );
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.REMOVE_SAVED_MOVIE);
        }
    };

    /** Получение информации о трейлере. */
    public getMovieTrailer = async (id: number) => {
        try {
            this.dispatch(getMovieTrailerPending());
            const response = await this.services.getMovieTrailer(id);
            this.dispatch(getMovieTrailerFulfilled(response.data));
        } catch (e) {
            this.dispatch(getMovieTrailerRejected());
        }
    };

    /** Получение списка похожих фильмов. */
    public getSimilarMovies = async (id: number) => {
        try {
            this.dispatch(getSimilarMoviesPending());
            const response = await this.services.getSimilarMovies(id);
            this.dispatch(getSimilarMoviesFulfilled(response.data));
        } catch (e) {
            this.dispatch(getSimilarMoviesRejected());
        }
    };
}
