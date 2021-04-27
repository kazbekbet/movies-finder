import { AppDispatch } from '../../store/rootReducer';
import { MoviesListServices } from '../../modules/MoviesList/services/services';
import { MovieListActions } from '../../modules/MoviesList/actions/actions';
import { CommonActions } from '../store/actions';
import { MovieInfoServices } from '../../modules/MovieInfo/services/services';
import { MovieInfoActions } from '../../modules/MovieInfo/actions/actions';

/** Фабрика экшенов. */
export class ActionsFactory {
    constructor(private readonly dispatch: AppDispatch) {}

    /** Возвращает общие экшены. */
    public get common() {
        return new CommonActions(this.dispatch);
    }

    /** Возвращает все экшены для компонента списка фильмов. */
    public get moviesList() {
        const services = new MoviesListServices();
        return new MovieListActions(services, this.dispatch);
    }

    /** Возвращает все экшены для компонента информации о фильме. */
    public get movieInfo() {
        const services = new MovieInfoServices();
        return new MovieInfoActions(services, this.dispatch);
    }
}
