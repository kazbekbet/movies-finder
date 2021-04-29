import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieShortInfo } from '../../MoviesList/store/models';

export interface IFavoritesMovies {
    status: PromiseStatuses;
    movies: IMovieShortInfo[] | null;
}
