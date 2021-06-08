import { PromiseStatuses } from "../../../common/enums/asyncActionStatuses";
import { IMovieListResponse } from "../../MoviesList/store/models";

export interface ForEveningState {
    status: PromiseStatuses,
    movies: IMovieListResponse | null;
}

export interface ForEveningSearchRequest {
    genres?: string;
    year?: number;
}
