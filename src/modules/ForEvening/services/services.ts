import { ForEveningSearchRequest } from '../store/models';
import { GET } from '../../../common/api/restRequests';
import { AxiosPromise } from 'axios';
import { IMovieListResponse } from '../../MoviesList/store/models';
import { SortTypes } from '../../../common/enums/sortTypes';

export class ForEveningServices {
    /** Получение списка фильмов согласно запросу. */
    getMoviesList = (request: ForEveningSearchRequest): AxiosPromise<IMovieListResponse> => {
        const requestParams = {
            sort_by: SortTypes.POPULARITY,
            include_adult: 'false',
            include_video: 'false',
            page: 1,
            primary_release_year: request.year,
            with_genres: request.genres,
        };

        return GET({ url: '/discover/movie?', params: requestParams });
    };
}
