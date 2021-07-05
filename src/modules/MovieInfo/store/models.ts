import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { Nullable } from '../../../common/models/additional';

export interface IMovieInfoModule {
    status: PromiseStatuses;
    result: Nullable<IMovieInfoResult>;
    trailer: Nullable<IMovieTrailerInfo>;
    trailerStatus: PromiseStatuses;
    similarMoviesStatus: PromiseStatuses;
    similarMovies: Nullable<IMovieInfoSimilarResult>;
}

export interface IMovieInfoResult extends IMovieShortInfo {
    poster_path: string;
    production_companies: Nullable<IProductionCompanies[]>;
    production_countries: Nullable<IProductionCountries[]>;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string;
    vote_count: number;
    genres: Nullable<IMovieGenres[]>;
    homepage: Nullable<string>;
    imdb_id: Nullable<string>;
}

interface IProductionCompanies {
    id: number;
    logo_path: string;
    name: string;
    origin_country: string;
}

interface IProductionCountries {
    name: string;
}

export interface ISpokenLanguages {
    english_name: string;
    name: string;
}

interface IMovieGenres {
    id: number;
    name: string;
}

export interface IMovieTrailerInfo {
    id: number;
    results: [
        {
            id: string;
            key: string;
            site: string;
        }
    ];
}

export interface IMovieInfoSimilarResult {
    page: number;
    results: Nullable<IMovieShortInfo[]>;
    total_pages: number;
    total_results: number;
}