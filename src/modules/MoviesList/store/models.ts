import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { SortTypes } from '../../../common/enums/sortTypes';
import { Nullable } from '../../../common/models/additional';

export interface IMovieListModule {
    status: PromiseStatuses;
    sortBy: Nullable<SortTypes>;
    page: number;
    movies: Nullable<IMovieListResponse>;
}

export interface IMovieListResponse {
    page: number;
    results: Nullable<IMovieShortInfo[]>;
}

export interface IMovieShortInfo {
    id: number;
    title: string;
    overview: string;
    backdrop_path: string;
    original_title: string;
    poster_path: string;
    popularity: number;
    vote_average: number;
    release_date: string;
    vote_count: number;
}
