import { MoviesListServices } from '../services/services';
import { SortTypes } from '../../../common/enums/sortTypes';
import { ChangePageTypes } from './types';
import {
    changePage,
    changeSort,
    getListDataFulfilled,
    getListDataPending,
    getListDataRejected,
} from '../store/reducer';
import { AppDispatch } from '../../../store/rootReducer';

export class MovieListActions {
    constructor(private readonly services: MoviesListServices, private readonly dispatch: AppDispatch) {}

    /** Получение списка фильмов. */
    public getMoviesList = async (sort: SortTypes, page: number) => {
        try {
            this.dispatch(getListDataPending({sort, page}));
            const response = await this.services.getMovieList({ sort, page });
            this.dispatch(getListDataFulfilled(response.data));
        } catch (e) {
            this.dispatch(getListDataRejected());
        }
    };

    /** Изменение страницы. */
    public changePage = ({ type, currentPage }: { type: ChangePageTypes; currentPage: number }) => {
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
