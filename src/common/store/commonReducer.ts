import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonReducer, CurrencyModel, GenreResponse } from './model';
import { RouterPaths } from '../../router/routerPaths';
import { PromiseStatuses } from '../enums/asyncActionStatuses';

const initialState: CommonReducer = {
    isError: false,
    errorText: '',
    currentRoute: null,
    currencyStatus: PromiseStatuses.IDLE,
    currencyResult: null,
    genresStatus: PromiseStatuses.IDLE,
    genres: null,
};

/** Редьюсер списка фильмов. */
export const commonSlice = createSlice({
    name: 'Common',
    initialState,
    reducers: {
        setError: (state, action: PayloadAction<string>) => {
            state.isError = true;
            state.errorText = action.payload;
        },
        clearError: state => {
            state.isError = false;
            state.errorText = '';
        },
        setCurrentRoute: (state, action: PayloadAction<RouterPaths>) => {
            state.currentRoute = action.payload;
        },
        getCurrencyPending: state => {
            state.currencyStatus = PromiseStatuses.PENDING;
        },
        getCurrencyFulfilled: (state, action: PayloadAction<CurrencyModel>) => {
            state.currencyStatus = PromiseStatuses.FULFILLED;
            state.currencyResult = action.payload;
        },
        getCurrencyRejected: state => {
            state.currencyStatus = PromiseStatuses.REJECTED;
            state.currencyResult = null;
        },
        getGenresPending: state => {
            state.genresStatus = PromiseStatuses.PENDING;
        },
        getGenresFulfilled: (state, action: PayloadAction<GenreResponse>) => {
            state.genresStatus = PromiseStatuses.FULFILLED;
            state.genres = action.payload.genres;
        },
        getGenresRejected: state => {
            state.genresStatus = PromiseStatuses.REJECTED;
            state.genres = null;
        },
    },
});

export const {
    setError,
    clearError,
    setCurrentRoute,
    getCurrencyPending,
    getCurrencyFulfilled,
    getCurrencyRejected,
    getGenresPending,
    getGenresFulfilled,
    getGenresRejected
} = commonSlice.actions;
