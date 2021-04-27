import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonReducer } from './model';

const initialState: CommonReducer = {
    isError: false,
    errorText: '',
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
    },
});

export const { setError, clearError } = commonSlice.actions;
