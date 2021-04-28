import { MoviesListServices } from '../services/services';
import { SortTypes } from '../../../common/enums/sortTypes';
import { ChangePageTypes } from './types';
import {
    changePage,
    changeSort,
    clearFetchedData,
    getListDataFulfilled,
    getListDataPending,
    getListDataRejected,
} from '../store/reducer';
import { AppDispatch } from '../../../store/rootReducer';
import { CommonActions } from '../../../common/store/actions';
import { ErrorsLocalization } from '../../../common/enums/errorsLocalization';

export class MovieListActions {
    constructor(private readonly services: MoviesListServices, private readonly dispatch: AppDispatch) {}

    private commonActions = new CommonActions(this.dispatch);

    /** Получение списка фильмов. */
    public getMoviesList = async (sort: SortTypes, page: number) => {
        try {
            this.dispatch(getListDataPending({ sort, page }));
            const response = await this.services.getMovieList({ sort, page });
            this.dispatch(getListDataFulfilled(response.data));
        } catch (e) {
            this.commonActions.setError(ErrorsLocalization.FETCH_DATA);
            this.dispatch(getListDataRejected());
        }
    };

    /** Изменение страницы. */
    changePage = ({ type, currentPage }: { type: ChangePageTypes; currentPage: number }) => {
        this.dispatch(clearFetchedData());
        switch (type) {
            case ChangePageTypes.INCREMENT:
                this.dispatch(changePage((currentPage += 1)));
                break;
            case ChangePageTypes.DECREMENT:
                this.dispatch(changePage((currentPage -= 1)));
                break;
        }
    };

    /** Изменение сортировки. */
    public changeSort = (sort: SortTypes) => {
        this.dispatch(changeSort(sort));
        this.getMoviesList(sort, 1);
    };
}
