import { IMovieInfoResult, ISpokenLanguages } from '../store/models';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { ApiConfig } from '../../../common/api/config';
import { getMovieReleaseYear, getMovieStatusLocalization } from '../../../common/utils/commonUtils';
import { isEmpty } from 'lodash';

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
            vote_count: movieInfo.vote_count,
        };
    };

    /** Поиск фильма в локальном хранилище. */
    public findMovieFromLocalStorage = (movieInfo: IMovieInfoResult, localStorage: IMovieShortInfo[]) => {
        return localStorage.find(movie => movie.id === movieInfo.id);
    };

    /** Получение пути постера. */
    public getMoviePoster = (path: string | undefined) => path && `${ApiConfig.POSTER_URL}${path}`;

    /** Получение конфига таблицы. */
    public getMovieInfoTableConfig = (movie: IMovieInfoResult): { label: string; value: string | number }[] => {
        const checkForNull = <T, R>(value: T, useValue: R) => (value ? useValue : 'неизвестно');

        const getLanguages = (list: ISpokenLanguages[]) => {
            if (!isEmpty(list)) {
                return movie.spoken_languages.map(lang => lang.english_name).join(', ');
            }
            return 'неизвестно';
        };

        return [
            { label: 'Год выпуска', value: getMovieReleaseYear(movie.release_date) },
            { label: 'Кассовые сборы', value: checkForNull(movie.revenue, `${movie.revenue}`) },
            { label: 'Длительность', value: checkForNull(movie.runtime, `${movie.runtime} мин.`) },
            { label: 'Средняя оценка', value: checkForNull(movie.vote_average, movie.vote_average) },
            { label: 'Всего голосов', value: checkForNull(movie.vote_count, movie.vote_count) },
            { label: 'Популярность', value: checkForNull(movie.popularity, `${movie.popularity.toFixed(0)} очков`) },
            { label: 'Статус', value: checkForNull(movie.status, getMovieStatusLocalization(movie.status)) },
            { label: 'Озвучка', value: getLanguages(movie.spoken_languages) },
        ];
    };
}
