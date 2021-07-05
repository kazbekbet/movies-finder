import { AxiosPromise } from 'axios';
import { IMovieInfoResult, IMovieInfoSimilarResult, IMovieTrailerInfo } from '../store/models';
import { GET } from '../../../common/api/restRequests';

/** Класс сервисов компонента информации о фильме. */
export class MovieInfoServices {
    /** Получение информации о фильме.*/
    getMovieInfo = (id: number): AxiosPromise<IMovieInfoResult> => {
        return GET({ url: `/movie/${id}` });
    };

    /** Получение трейлера. */
    getMovieTrailer = (id: number): AxiosPromise<IMovieTrailerInfo> => {
        return GET({ url: `/movie/${id}/videos` });
    };

    /** Получение списка похожих фильмов. */
    getSimilarMovies = (id: number): AxiosPromise<IMovieInfoSimilarResult> => {
        return GET({url: `/movie/${id}/similar`})
    }
}
