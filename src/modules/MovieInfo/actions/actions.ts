import { AppDispatch } from '../../../store/rootReducer';
import { MovieInfoServices } from '../services/services';
import { CommonActions } from '../../../common/store/actions';
import { clearMovieInfoData, getMovieInfoFulfilled, getMovieInfoPending, getMovieInfoRejected } from '../store/reducer';
import { IMovieInfoResult } from '../store/models';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class MovieInfoActions {
    constructor(private readonly services: MovieInfoServices, private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);

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
        try {
            const storedDataValue = await AsyncStorage.getItem('favorites');
            if (storedDataValue) {
                const storedData = JSON.parse(storedDataValue) as IMovieInfoResult[];
                const mergedData = [...storedData, movie];
                const jsonValue = JSON.stringify(mergedData);
                await AsyncStorage.setItem('favorites', jsonValue);
            } else {
                await AsyncStorage.setItem('favorites', JSON.stringify([movie]));
            }
        } catch (e) {
            this.commonActions.setError('Ошибка сохранения фильма.');
        }
    };

    public getMoviesFromLocalStorage = async () => {
        try {
            const storedDataValue = await AsyncStorage.getItem('favorites');
            if (storedDataValue) {
                return JSON.parse(storedDataValue) as IMovieInfoResult[];
            }
        } catch (e) {
            this.commonActions.setError('Ошибка сохранения фильма.');
        }
    };
}
