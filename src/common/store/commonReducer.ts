import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonReducer, CurrencyModel } from './model';
import { RouterPaths } from '../../router/routerPaths';
import { PromiseStatuses } from '../enums/asyncActionStatuses';

const initialState: CommonReducer = {
    isError: false,
    errorText: '',
    currentRoute: null,
    currencyStatus: PromiseStatuses.IDLE,
    currencyResult: null,
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
    },
});

export const {
    setError,
    clearError,
    setCurrentRoute,
    getCurrencyPending,
    getCurrencyFulfilled,
    getCurrencyRejected,
} = commonSlice.actions;
