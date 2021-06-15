import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieShortInfo } from '../../MoviesList/store/models';
import { Nullable } from '../../../common/models/additional';

export interface IFavoritesMovies {
    status: PromiseStatuses;
    movies: Nullable<IMovieShortInfo[]>;
}
