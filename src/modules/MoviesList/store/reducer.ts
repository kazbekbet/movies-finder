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
        getListDataPending: (state, action: PayloadAction<{ sort: SortTypes; page: number }>) => {
            state.status = PromiseStatuses.PENDING;
            state.sortBy = action.payload.sort;
            state.page = action.payload.page;
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
        changeSort: (state, action: PayloadAction<SortTypes>) => {
            state.sortBy = action.payload;
        },
        clearFetchedData: state => {
            state.movies = null;
        },
        setDefaultState: state => {
            state.status = initialState.status;
            state.page = initialState.page;
            state.sortBy = initialState.sortBy;
            state.movies = initialState.movies;
        },
    },
});

export const {
    getListDataPending,
    getListDataFulfilled,
    getListDataRejected,
    changePage,
    changeSort,
    clearFetchedData,
    setDefaultState
} = moviesListSlice.actions;
