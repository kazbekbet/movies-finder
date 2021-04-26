import { AppDispatch } from '../../store/rootReducer';
import { MoviesListServices } from '../../modules/MoviesList/services/services';
import { MovieListActions } from '../../modules/MoviesList/actions/actions';

/** Фабрика экшенов. */
export class ActionsFactory {
    constructor(private readonly dispatch: AppDispatch) {}

    /** Возвращает все экшены для компонента списка фильмов. */
    public get moviesList() {
        const services = new MoviesListServices();
        return new MovieListActions(services, this.dispatch);
    }
}
