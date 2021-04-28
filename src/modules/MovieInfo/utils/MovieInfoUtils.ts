import { IMovieInfoResult } from '../store/models';
import { IMovieShortInfo } from '../../MoviesList/store/models';

/** Класс утилит карточки фильма. */
export class MovieInfoUtils {
    /** Трансформация полного объекта в сжатое представление. */
    public getShortMovieInfo = (movieInfo: IMovieInfoResult): IMovieShortInfo => {
        return {
            id: movieInfo.id,
            backdrop_path: movieInfo.backdrop_path,
            original_title: movieInfo.original_title,
            overview: movieInfo.overview,
            popularity: movieInfo.popularity,
            release_date: movieInfo.release_date,
            title: movieInfo.title,
            vote_average: movieInfo.vote_average,
        };
    };

    /** Поиск фильма в локальном хранилище. */
    public findMovieFromLocalStorage = (movieInfo: IMovieInfoResult, localStorage: IMovieShortInfo[]) => {
        return localStorage.find(movie => movie.id === movieInfo.id);
    };
}
