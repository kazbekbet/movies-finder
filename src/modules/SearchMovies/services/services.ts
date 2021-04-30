import { IMovieSearchResults } from '../store/models';
import { GET } from '../../../common/api/restRequests';
import { AxiosPromise } from 'axios';

export class SearchMoviesServices {
    /** Запрос поиска фильмов. */
    searchMovies = (query: string, page: number): AxiosPromise<IMovieSearchResults> => {
        const requestParams = {
            query,
            page,
            include_adult: 'false',
        };

        return GET({ url: '/search/movie?', params: requestParams });
    };
}
