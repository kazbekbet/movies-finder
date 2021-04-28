import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonReducer } from './model';
import { RouterPaths } from '../../router/routerPaths';

const initialState: CommonReducer = {
    isError: false,
    errorText: '',
    currentRoute: null,
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
    },
});

export const { setError, clearError, setCurrentRoute } = commonSlice.actions;
