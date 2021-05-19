import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieInfoModule, IMovieInfoResult, IMovieTrailerInfo } from './models';
import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';

/** Начальное состояние. */
const initialState: IMovieInfoModule = {
    status: PromiseStatuses.IDLE,
    result: null,
    trailer: null,
    trailerStatus: PromiseStatuses.IDLE,
};

/** Редьюсер списка фильмов. */
export const movieInfoSlice = createSlice({
    name: 'MovieInfo',
    initialState,
    reducers: {
        getMovieInfoPending: state => {
            state.status = PromiseStatuses.PENDING;
        },
        getMovieInfoFulfilled: (state, action: PayloadAction<IMovieInfoResult>) => {
            state.status = PromiseStatuses.FULFILLED;
            state.result = action.payload;
        },
        getMovieInfoRejected: state => {
            state.status = PromiseStatuses.REJECTED;
        },
        clearMovieInfoData: state => {
            state.status = PromiseStatuses.IDLE;
            state.result = null;
        },
        getMovieTrailerPending: state => {
            state.trailerStatus = PromiseStatuses.PENDING;
        },
        getMovieTrailerFulfilled: (state, action: PayloadAction<IMovieTrailerInfo>) => {
            state.trailerStatus = PromiseStatuses.FULFILLED;
            state.trailer = action.payload;
        },
        getMovieTrailerRejected: state => {
            state.trailerStatus = PromiseStatuses.REJECTED;
        },
    },
});

export const {
    getMovieInfoPending,
    getMovieInfoFulfilled,
    getMovieInfoRejected,
    clearMovieInfoData,
    getMovieTrailerPending,
    getMovieTrailerFulfilled,
    getMovieTrailerRejected
} = movieInfoSlice.actions;
