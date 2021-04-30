import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { SortTypes } from '../../../common/enums/sortTypes';

export interface IMovieListModule {
    status: PromiseStatuses;
    sortBy: SortTypes | null;
    page: number;
    movies: IMovieListResponse | null;
}

export interface IMovieListResponse {
    page: number;
    results: IMovieShortInfo[] | null;
}

export interface IMovieShortInfo {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    original_title: string;
    popularity: number;
    vote_average: number;
    release_date: string;
    vote_count: number
}
