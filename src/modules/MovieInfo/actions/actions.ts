import { AppDispatch } from '../../../store/rootReducer';
import { MovieInfoServices } from '../services/services';
import { CommonActions } from '../../../common/store/actions';
import { clearMovieInfoData, getMovieInfoFulfilled, getMovieInfoPending, getMovieInfoRejected } from '../store/reducer';
import { IMovieInfoResult } from '../store/models';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LocalStorage } from '../../../common/enums/localStorage';
import { ErrorsLocalization } from '../../../common/enums/errorsLocalization';
import { MovieInfoUtils } from '../utils/MovieInfoUtils';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { ToastAndroid } from "react-native";
import { remove } from 'lodash';

export class MovieInfoActions {
    constructor(private readonly services: MovieInfoServices, private readonly dispatch: AppDispatch) {
    }

    private commonActions = new CommonActions(this.dispatch);
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
            const storedDataValue = await AsyncStorage.getItem(LocalStorage.FAVOURITES_MOVIES);
            if (storedDataValue) {
                const storedData = JSON.parse(storedDataValue) as IMovieShortInfo[];
                const mergedData = [...storedData, shortMovieInfo];
                await AsyncStorage.setItem(LocalStorage.FAVOURITES_MOVIES, JSON.stringify(mergedData));
            } else {
                await AsyncStorage.setItem(LocalStorage.FAVOURITES_MOVIES, JSON.stringify([shortMovieInfo]));
            }
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.MOVIE_SAVING);
        }
    };

    /** Получение списка фильмов. */
    public getMoviesFromLocalStorage = async () => {
        try {
            const storedDataValue = await AsyncStorage.getItem(LocalStorage.FAVOURITES_MOVIES);
            if (storedDataValue) return JSON.parse(storedDataValue) as IMovieShortInfo[];
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.GET_SAVED_MOVIE);
        }
    };

    /** Удаление фильма из списка. */
    public removeMovieFromLocalStorage = async (movie: IMovieInfoResult) => {
        try {
            const storedData = await this.getMoviesFromLocalStorage();
            if (storedData) {
                const newStoredData = await remove(storedData, item => item.id !== movie.id);
                await this.setNewStoredData(newStoredData);
            }
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.REMOVE_SAVED_MOVIE);
        }
    };

    /** Перезапись данных. */
    private setNewStoredData = async (newData: IMovieShortInfo[]) => {
        try {
            await AsyncStorage.removeItem(LocalStorage.FAVOURITES_MOVIES);
            await AsyncStorage.setItem(LocalStorage.FAVOURITES_MOVIES, JSON.stringify(newData));
        } catch (e) {
            console.warn(ErrorsLocalization.SET_NEW_MOVIES_DATA);
        }
    };
}
