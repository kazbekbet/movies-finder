import { IMovieListResponse } from '../../MoviesList/store/models';
import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { Nullable } from '../../../common/models/additional';

export interface IMovieSearchModule {
    query: string;
    lastQueryValue: string;
    status: PromiseStatuses;
    page: number;
    movies: Nullable<IMovieSearchResults>;
    newPageLoadStatus: PromiseStatuses;
}

export interface IMovieSearchResults extends IMovieListResponse {
    total_pages: number;
    total_results: number;
}
