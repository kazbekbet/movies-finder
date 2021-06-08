import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieListResponse } from '../../MoviesList/store/models';
import { ForEveningState } from './models';

/** Начальное состояние. */
const initialState: ForEveningState = {
    status: PromiseStatuses.IDLE,
    movies: null,
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
    },
});

export const { getMoviesPending, getMoviesFulfilled, getMoviesRejected } = forEveningSlice.actions;
