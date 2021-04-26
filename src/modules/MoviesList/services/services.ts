import { GET } from '../../../common/api/restRequests';
import { SortTypes } from '../../../common/enums/sortTypes';
import { AxiosPromise } from 'axios';
import { IMovieListResponse } from '../store/models';

export class MoviesListServices {
    /**
     * Получение списка фильмов.
     * */
    getMovieList = (params: { sort: SortTypes; page: number }): AxiosPromise<IMovieListResponse> => {
        const requestParams = {
            sort_by: params.sort,
            include_adult: 'false',
            include_video: 'false',
            page: params.page,
        };

        return GET({ url: '/discover/movie?', params: requestParams });
    };
}
