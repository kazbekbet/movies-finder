import { moviesListSlice } from '../modules/MoviesList/store/reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonSlice } from '../common/store/commonReducer';

const rootReducer = combineReducers({
    moviesList: moviesListSlice.reducer,
    common: commonSlice.reducer,
});

export const globalStore = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
