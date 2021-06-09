import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieListResponse, IMovieShortInfo } from '../../MoviesList/store/models';
import { ForEveningState } from './models';

/** Начальное состояние. */
const initialState: ForEveningState = {
    status: PromiseStatuses.IDLE,
    movies: null,
    historyStatus: PromiseStatuses.IDLE,
    history: null,
};

/** Редьюсер компонента фильмов на вечер. */
export const forEveningSlice = createSlice({
    name: 'ForEvening',
    initialState,
    reducers: {
        getMoviesPending: state => {
            state.status = PromiseStatuses.PENDING;
        },
        getMoviesFulfilled: (state, action: PayloadAction<IMovieListResponse>) => {
            state.status = PromiseStatuses.FULFILLED;
            state.movies = action.payload;
        },
        getMoviesRejected: state => {
            state.status = PromiseStatuses.REJECTED;
            state.movies = null;
        },
        getHistoryPending: state => {
            state.historyStatus = PromiseStatuses.PENDING;
        },
        getHistoryFulfilled: (state, action: PayloadAction<IMovieShortInfo[] | null>) => {
            state.historyStatus = PromiseStatuses.FULFILLED;
            state.history = action.payload;
        },
        getHistoryRejected: state => {
            state.historyStatus = PromiseStatuses.REJECTED;
            state.history = null;
        },
    },
});

export const {
    getMoviesPending,
    getMoviesFulfilled,
    getMoviesRejected,
    getHistoryPending,
    getHistoryFulfilled,
    getHistoryRejected,
} = forEveningSlice.actions;
