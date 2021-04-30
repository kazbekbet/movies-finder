import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieSearchModule, IMovieSearchResults } from './models';
import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import {uniqBy} from 'lodash'

const initialState: IMovieSearchModule = {
    query: '',
    status: PromiseStatuses.IDLE,
    page: 1,
    movies: null,
    newPageLoadStatus: PromiseStatuses.IDLE,
};

/** Редьюсер списка фильмов. */
export const searchMoviesSlice = createSlice({
    name: 'SearchMovies',
    initialState,
    reducers: {
        setQueryValue: (state, action: PayloadAction<string>) => {
            state.query = action.payload;
        },
        getSearchListPending: (state, action: PayloadAction<number>) => {
            state.status = PromiseStatuses.PENDING;
            state.page = action.payload;
        },
        getSearchListFulfilled: (state, action: PayloadAction<IMovieSearchResults>) => {
            state.status = PromiseStatuses.FULFILLED;
            state.movies = action.payload;
        },
        getSearchListRejected: state => {
            state.status = PromiseStatuses.REJECTED;
        },
        clearData: state => {
            state.status = PromiseStatuses.IDLE;
            state.page = 1;
            state.movies = null;
        },
        changePage: (state, action: PayloadAction<number>) => {
            if (state.newPageLoadStatus !== PromiseStatuses.PENDING) {
                state.page = action.payload;
            }
        },
        loadNewPageDataPending: state => {
            state.newPageLoadStatus = PromiseStatuses.PENDING;
        },
        loadNewPageDataFulfilled: (state, action: PayloadAction<IMovieSearchResults>) => {
            if (state.movies?.results && action.payload.results) {
                const mergedData = state.movies.results.concat(action.payload.results);
                state.movies.results = uniqBy(mergedData, (movie) => movie.id);
                state.movies.page = state.page;
                state.newPageLoadStatus = PromiseStatuses.FULFILLED;
            }
        },
        loadNewPageDataRejected: state => {
            state.status = PromiseStatuses.REJECTED;
        },
    },
});

export const {
    setQueryValue,
    getSearchListPending,
    getSearchListFulfilled,
    getSearchListRejected,
    clearData,
    changePage,
    loadNewPageDataPending,
    loadNewPageDataFulfilled,
    loadNewPageDataRejected,
} = searchMoviesSlice.actions;
