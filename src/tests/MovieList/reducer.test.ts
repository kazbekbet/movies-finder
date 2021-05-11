import { globalStore } from '../../store/rootReducer';
import { PromiseStatuses } from '../../common/enums/asyncActionStatuses';
import {
    changePage,
    changeSort,
    clearFetchedData,
    getListDataFulfilled,
    getListDataPending,
    getListDataRejected,
    setDefaultState,
} from '../../modules/MoviesList/store/reducer';
import { SortTypes } from '../../common/enums/sortTypes';
import { IMovieListModule } from '../../modules/MoviesList/store/models';

describe('Movie List test suite', () => {
    const getCurrentState = () => globalStore.getState().moviesList;
    const dispatch = globalStore.dispatch;

    const initialState: IMovieListModule = {
        status: PromiseStatuses.IDLE,
        page: 1,
        sortBy: null,
        movies: null,
    };

    const mockMoviesResults = [
        {
            id: 1,
            title: 'Test',
            overview: 'Test',
            backdrop_path: 'Test',
            original_title: 'Test',
            popularity: 3,
            vote_average: 2,
            release_date: 'Test',
            vote_count: 43,
        },
    ];

    afterEach(() => dispatch(setDefaultState()));

    test('Should switch to pending status', () => {
        dispatch(getListDataPending({ sort: SortTypes.RELEASE_DATE, page: 2 }));

        expect(getCurrentState()).toEqual({
            ...initialState,
            sortBy: SortTypes.RELEASE_DATE,
            page: 2,
            status: PromiseStatuses.PENDING,
        });
    });

    test('Should set movies results', () => {
        dispatch(getListDataFulfilled({ page: 1, results: mockMoviesResults }));

        expect(getCurrentState()).toEqual({
            ...initialState,
            status: PromiseStatuses.FULFILLED,
            movies: {
                page: 1,
                results: mockMoviesResults,
            },
        });
    });

    test('Should switch to rejected status', () => {
        dispatch(getListDataRejected());
        expect(getCurrentState()).toEqual({ ...initialState, status: PromiseStatuses.REJECTED });
    });

    test('Should set new page', () => {
        dispatch(changePage(3));
        expect(getCurrentState()).toEqual({ ...initialState, page: 3 });
    });

    test('Should set new sort', () => {
        dispatch(changeSort(SortTypes.VOTE_COUNT));
        expect(getCurrentState()).toEqual({ ...initialState, sortBy: SortTypes.VOTE_COUNT });
    });

    test('Should clear all fetched data', () => {
        dispatch(getListDataFulfilled({page: 1, results: mockMoviesResults}))
        dispatch(clearFetchedData());
        expect(getCurrentState()).toEqual({...initialState, status: PromiseStatuses.FULFILLED});
    });
});
