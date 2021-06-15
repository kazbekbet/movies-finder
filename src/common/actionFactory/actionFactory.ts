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

type Nullable<T> = T | null;

/** Фабрика экшенов. */
export class ActionsFactory {
    constructor(private readonly dispatch: AppDispatch) {}

    /** Мемоизация инстансов классов. */
    private common: Nullable<CommonActions> = null;

    private movieList: Nullable<MovieListActions> = null;
    private movieListServices: Nullable<MoviesListServices> = null;

    private movieInfo: Nullable<MovieInfoActions> = null;
    private movieInfoServices: Nullable<MovieInfoServices> = null;

    private favoritesMovies: Nullable<FavoritesMoviesActions> = null;

    private searchMovies: Nullable<SearchMoviesActions> = null;
    private searchMoviesServices: Nullable<SearchMoviesServices> = null;

    private forEvening: Nullable<ForEveningActions> = null;
    private forEveningServices: Nullable<ForEveningServices> = null;

    /** Возвращает общие экшены. */
    public get commonActions(): CommonActions {
        if (this.common === null) {
            this.common = new CommonActions(this.dispatch);
        }

        return this.common;
    }

    /** Возвращает все экшены для компонента списка фильмов. */
    public get moviesListActions(): MovieListActions {
        if (this.movieList === null || this.movieListServices === null) {
            this.movieListServices = new MoviesListServices();
            this.movieList = new MovieListActions(this.movieListServices, this.dispatch);
        }

        return this.movieList;
    }

    /** Возвращает все экшены для компонента информации о фильме. */
    public get movieInfoActions(): MovieInfoActions {
        if (this.movieInfo === null || this.movieInfoServices === null) {
            this.movieInfoServices = new MovieInfoServices();
            this.movieInfo = new MovieInfoActions(this.movieInfoServices, this.dispatch);
        }

        return this.movieInfo;
    }

    /** Возвращает все экшены для компонента избранных фильмов. */
    public get favoritesMoviesActions(): FavoritesMoviesActions {
        if (this.favoritesMovies === null) {
            this.favoritesMovies = new FavoritesMoviesActions(this.dispatch);
        }

        return this.favoritesMovies;
    }

    /** Возвращает все экшены для компонента поиска фильмов. */
    public get searchMoviesActions(): SearchMoviesActions {
        if (this.searchMoviesServices === null || this.searchMovies === null) {
            this.searchMoviesServices = new SearchMoviesServices();
            this.searchMovies = new SearchMoviesActions(this.searchMoviesServices, this.dispatch);
        }

        return this.searchMovies;
    }

    /** Возвращает все экшены для компонента фильмов на вечер. */
    public get forEveningActions(): ForEveningActions {
        if (this.forEvening === null || this.forEveningServices === null) {
            this.forEveningServices = new ForEveningServices();
            this.forEvening = new ForEveningActions(this.forEveningServices, this.dispatch);
        }

        return this.forEvening;
    }
}
