import { AppDispatch } from '../../../store/rootReducer';
import { getFavoritesListFulfilled, getFavoritesListPending, getFavoritesListRejected } from '../store/reducer';
import { localStorageUtils } from '../../../common/localStorage/LocalStorage';
import { ELocalStorage } from '../../../common/enums/localStorage';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { ErrorsLocalization } from '../../../common/enums/errorsLocalization';
import { CommonActions } from '../../../common/store/actions';

export class FavoritesMoviesActions {
    constructor(private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);

    /** Получение списка избранных фильмов. */
    public getFavoritesMovies = async () => {
        try {
            this.dispatch(getFavoritesListPending());
            const response = await localStorageUtils.getData<IMovieShortInfo[]>(ELocalStorage.FAVOURITES_MOVIES);
            this.dispatch(getFavoritesListFulfilled(response));
        } catch (e) {
            this.dispatch(getFavoritesListRejected());
        }
    };

    /** Очистка всех данных . */
    public deleteAllData = async () => {
        try {
            await localStorageUtils.deleteAllDataByKey(ELocalStorage.FAVOURITES_MOVIES);
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.DELETE_ALL_DATA);
        }
    };
}
