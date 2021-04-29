import { PromiseStatuses } from '../../../common/enums/asyncActionStatuses';
import { IFavoritesMovies } from './models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovieShortInfo } from '../../MoviesList/store/models';

/** Начальное состояние. */
const initialState: IFavoritesMovies = {
    status: PromiseStatuses.IDLE,
    movies: null,
};

/** Редьюсер списка избранных фильмов. */
export const favoritesMoviesSlice = createSlice({
    name: 'FavoritesMovies',
    initialState,
    reducers: {
        getFavoritesListPending: state => {
            state.status = PromiseStatuses.PENDING;
        },
        getFavoritesListFulfilled: (state, action: PayloadAction<IMovieShortInfo[] | null>) => {
            state.status = PromiseStatuses.FULFILLED;
            state.movies = action.payload;
        },
        getFavoritesListRejected: state => {
            state.status = PromiseStatuses.REJECTED;
        },
    },
});

export const {
    getFavoritesListPending,
    getFavoritesListFulfilled,
    getFavoritesListRejected,
} = favoritesMoviesSlice.actions;
