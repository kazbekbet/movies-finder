import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IMovieListModule, IMovieListResponse } from './models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SortTypes } from '../../../common/enums/sortTypes';

/** Начальное состояние. */
const initialState: IMovieListModule = {
    status: PromiseStatuses.IDLE,
    page: 1,
    sortBy: null,
    movies: null,
};

/** Редьюсер списка фильмов. */
export const moviesListSlice = createSlice({
    name: 'MoviesList',
    initialState,
    reducers: {
        getListDataPending: (state, action: PayloadAction<SortTypes>) => {
            state.status = PromiseStatuses.PENDING;
            state.sortBy = action.payload;
            state.movies = null;
        },
        getListDataFulfilled: (state, action: PayloadAction<IMovieListResponse>) => {
            state.status = PromiseStatuses.FULFILLED;
            state.movies = action.payload;
        },
        getListDataRejected: state => {
            state.status = PromiseStatuses.REJECTED;
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    },
});

export const { getListDataPending, getListDataFulfilled, getListDataRejected, changePage } = moviesListSlice.actions;
