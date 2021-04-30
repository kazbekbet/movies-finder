import { AppDispatch } from '../../../store/rootReducer';
import {
    changePage,
    clearData,
    getSearchListFulfilled,
    getSearchListPending,
    getSearchListRejected,
    loadNewPageDataFulfilled,
    loadNewPageDataPending,
    loadNewPageDataRejected,
    setQueryValue,
} from '../store/reducer';
import { SearchMoviesServices } from '../services/services';

export class SearchMoviesActions {
    constructor(private readonly services: SearchMoviesServices, private readonly dispatch: AppDispatch) {
    }

    /** Запись значения поиска из текстового поля. */
    setQueryValue = (value: string) => {
        this.dispatch(setQueryValue(value));
    };

    /** Отправка запроса на поиск фильма. */
    submitQueryValue = async (query: string, page: number) => {
        try {
            await this.dispatch(getSearchListPending(page));
            const response = await this.services.searchMovies(query, 1);
            await this.dispatch(getSearchListFulfilled(response.data));
        } catch (e) {
            this.dispatch(getSearchListRejected());
        }
    };

    /** Очистка данных. */
    clearData = () => this.dispatch(clearData());

    /** Новая страница. */
    changePage = (currentPage: number, maxPages: number) => {
        if (maxPages > currentPage) {
            this.dispatch(changePage(currentPage + 1));
        }
    };

    /** Загрузка данных следующей страницы. */
    loadNewPageData = async (query: string, page: number) => {
        try {
            await this.dispatch(loadNewPageDataPending());
            const response = await this.services.searchMovies(query, page);
            await this.dispatch(loadNewPageDataFulfilled(response.data));
        } catch (e) {
            this.dispatch(loadNewPageDataRejected());
        }
    };
}
