import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieShortInfo } from '../../MoviesList/store/models';

export interface IMovieInfoModule {
    status: PromiseStatuses;
    result: IMovieInfoResult | null;
}

export interface IMovieInfoResult extends IMovieShortInfo {
    poster_path: string;
    production_companies: IProductionCompanies[] | null;
    production_countries: IProductionCountries[] | null;
    revenue: number;
    runtime: number;
    spoken_languages: ISpokenLanguages[];
    status: string;
    tagline: string;
    vote_count: number;
    genres: IMovieGenres[] | null;
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

interface ISpokenLanguages {
    english_name: string;
    name: string;
}

interface IMovieGenres {
    id: number;
    name: string;
}
