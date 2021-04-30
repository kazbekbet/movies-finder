import { IMovieListResponse } from '../../MoviesList/store/models';
import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';

export interface IMovieSearchModule {
    query: string;
    status: PromiseStatuses;
    page: number;
    movies: IMovieSearchResults | null;
    newPageLoadStatus: PromiseStatuses;
}

export interface IMovieSearchResults extends IMovieListResponse {
    total_pages: number;
    total_results: number;
}
