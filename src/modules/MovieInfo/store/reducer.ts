import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieInfoModule, IMovieInfoResult } from './models';
import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';

/** Начальное состояние. */
const initialState: IMovieInfoModule = {
    status: PromiseStatuses.IDLE,
    result: null,
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
    },
});

export const {
    getMovieInfoPending,
    getMovieInfoFulfilled,
    getMovieInfoRejected,
    clearMovieInfoData,
} = movieInfoSlice.actions;
