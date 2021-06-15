import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieListResponse, IMovieShortInfo } from '../../MoviesList/store/models';
import { Nullable } from "../../../common/models/additional";

export interface ForEveningState {
    status: PromiseStatuses;
    movies: Nullable<IMovieListResponse>;
    historyStatus: PromiseStatuses;
    history: Nullable<IMovieShortInfo[]>;
}

export interface ForEveningSearchRequest {
    genres?: string;
    year?: number;
}
