import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieListResponse, IMovieShortInfo } from '../../MoviesList/store/models';

export interface ForEveningState {
    status: PromiseStatuses;
    movies: IMovieListResponse | null;
    historyStatus: PromiseStatuses;
    history: IMovieShortInfo[] | null;
}

export interface ForEveningSearchRequest {
    genres?: string;
    year?: number;
}
