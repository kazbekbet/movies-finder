import { moviesListSlice } from '../modules/MoviesList/store/reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

const rootReducer = combineReducers({
    moviesList: moviesListSlice.reducer,
});

export const globalStore = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
