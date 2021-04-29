import { AppDispatch } from '../../../store/rootReducer';
import { getFavoritesListFulfilled, getFavoritesListPending, getFavoritesListRejected } from '../store/reducer';
import { LocalStorage } from '../../../common/localStorage/LocalStorage';
import { ELocalStorage } from '../../../common/enums/localStorage';
import { IMovieShortInfo } from '../../MoviesList/store/models';

export class FavoritesMoviesActions {
    constructor(private readonly dispatch: AppDispatch) {}

    localStorage = new LocalStorage();

    public getFavoritesMovies = async () => {
        try {
            this.dispatch(getFavoritesListPending());
            const response = await this.localStorage.getData<IMovieShortInfo[]>(ELocalStorage.FAVOURITES_MOVIES);
            this.dispatch(getFavoritesListFulfilled(response));
        } catch (e) {
            this.dispatch(getFavoritesListRejected());
        }
    };
}
