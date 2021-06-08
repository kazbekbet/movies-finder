import { AppDispatch } from '../../../store/rootReducer';
import { ForEveningServices } from '../services/services';
import { ForEveningSearchRequest } from '../store/models';
import * as actions from '../store/reducer';
import { CommonActions } from '../../../common/store/actions';

export class ForEveningActions {
    constructor(private readonly services: ForEveningServices, private readonly dispatch: AppDispatch) {}

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
}
