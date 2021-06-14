import { AppDispatch } from '../../store/rootReducer';
import { MoviesListServices } from '../../modules/MoviesList/services/services';
import { MovieListActions } from '../../modules/MoviesList/actions/actions';
import { CommonActions } from '../store/actions';
import { MovieInfoServices } from '../../modules/MovieInfo/services/services';
import { MovieInfoActions } from '../../modules/MovieInfo/actions/actions';
import { FavoritesMoviesActions } from '../../modules/FavoritesMovies/actions/FavoritesMoviesActions';
import { SearchMoviesActions } from '../../modules/SearchMovies/actions/actions';
import { SearchMoviesServices } from '../../modules/SearchMovies/services/services';
import { ForEveningServices } from '../../modules/ForEvening/services/services';
import { ForEveningActions } from '../../modules/ForEvening/actions/actions';

/** Фабрика экшенов. */
export class ActionsFactory {
    constructor(private readonly dispatch: AppDispatch) {}

    /** Возвращает общие экшены. */
    public get commonActions() {
        return new CommonActions(this.dispatch);
    }

    /** Возвращает все экшены для компонента списка фильмов. */
    public get moviesListActions() {
        const services = new MoviesListServices();
        return new MovieListActions(services, this.dispatch);
    }

    /** Возвращает все экшены для компонента информации о фильме. */
    public get movieInfoActions() {
        const services = new MovieInfoServices();
        return new MovieInfoActions(services, this.dispatch);
    }

    /** Возвращает все экшены для компонента избранных фильмов. */
    public get favoritesMoviesActions() {
        return new FavoritesMoviesActions(this.dispatch);
    }

    /** Возвращает все экшены для компонента поиска фильмов. */
    public get searchMoviesActions() {
        const services = new SearchMoviesServices();
        return new SearchMoviesActions(services, this.dispatch);
    }

    /** Возвращает все экшены для компонента фильмов на вечер. */
    public get forEveningActions() {
        const services = new ForEveningServices();
        return new ForEveningActions(services, this.dispatch);
    }
}
