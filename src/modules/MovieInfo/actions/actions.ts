import { AppDispatch } from '../../../store/rootReducer';
import { MovieInfoServices } from '../services/services';
import { CommonActions } from '../../../common/store/actions';
import { clearMovieInfoData, getMovieInfoFulfilled, getMovieInfoPending, getMovieInfoRejected } from '../store/reducer';
import { IMovieInfoResult } from '../store/models';
import { ELocalStorage } from '../../../common/enums/localStorage';
import { ErrorsLocalization } from '../../../common/enums/errorsLocalization';
import { MovieInfoUtils } from '../utils/MovieInfoUtils';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { LocalStorage } from '../../../common/localStorage/LocalStorage';

export class MovieInfoActions {
    constructor(private readonly services: MovieInfoServices, private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);
    private localStorage = new LocalStorage();
    private utils = new MovieInfoUtils();

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
    public setMovieToLocalStorage = async (movie: IMovieInfoResult) => {
        const shortMovieInfo = this.utils.getShortMovieInfo(movie);
        try {
            await this.localStorage.setItemToArray<IMovieShortInfo>(shortMovieInfo, ELocalStorage.FAVOURITES_MOVIES);
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
            await this.localStorage.removeItemFromArray(
                movie,
                ELocalStorage.FAVOURITES_MOVIES,
                storedMovie => storedMovie.id !== movie.id
            );
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.REMOVE_SAVED_MOVIE);
        }
    };
}
