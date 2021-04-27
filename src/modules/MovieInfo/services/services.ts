import { AxiosPromise } from 'axios';
import { IMovieInfoResult } from '../store/models';
import { GET } from '../../../common/api/restRequests';

/** Класс сервисов компонента информации о фильме. */
export class MovieInfoServices {
    /** Получение информации о фильме.*/
    getMovieInfo = (id: number): AxiosPromise<IMovieInfoResult> => {
        return GET({ url: `/movie/${id}` });
    };
}
