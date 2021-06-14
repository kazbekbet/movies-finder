import { ActionsFactory } from '../../common/actionFactory/actionFactory';
import { globalStore } from '../../store/rootReducer';
import { CommonActions } from '../../common/store/actions';
import { MovieListActions } from '../../modules/MoviesList/actions/actions';
import { MovieInfoActions } from '../../modules/MovieInfo/actions/actions';
import { FavoritesMoviesActions } from '../../modules/FavoritesMovies/actions/FavoritesMoviesActions';
import { SearchMoviesActions } from '../../modules/SearchMovies/actions/actions';
import { SearchMoviesServices } from '../../modules/SearchMovies/services/services';

describe('Action Factory test', () => {
    const dispatch = globalStore.dispatch;
    const actions = new ActionsFactory(dispatch);

    test('Should return true if object is instance of common actions', () => {
        const common = actions.commonActions;
        expect(common instanceof CommonActions).toBeTruthy();
    });

    test('Should return true if object is instance of moviesList actions', () => {
        const moviesList = actions.moviesListActions;
        expect(moviesList instanceof MovieListActions).toBeTruthy();
    });

    test('Should return true if object is instance of movieInfo actions', () => {
        const movieInfo = actions.movieInfoActions;
        expect(movieInfo instanceof MovieInfoActions).toBeTruthy();
    });

    test('Should return true if object is instance of favoritesMovies actions', () => {
        const favoritesMovies = actions.favoritesMoviesActions;
        expect(favoritesMovies instanceof FavoritesMoviesActions).toBeTruthy();
    });

    test('Should return true if object is instance of searchMovies actions', () => {
        const searchMovies = actions.searchMoviesActions;
        expect(searchMovies instanceof SearchMoviesActions).toBeTruthy();
    });
});
