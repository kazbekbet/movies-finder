import { moviesListSlice } from '../modules/MoviesList/store/reducer';
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { commonSlice } from '../common/store/commonReducer';
import { movieInfoSlice } from '../modules/MovieInfo/store/reducer';

const rootReducer = combineReducers({
    common: commonSlice.reducer,
    moviesList: moviesListSlice.reducer,
    movieInfo: movieInfoSlice.reducer,
});

export const globalStore = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof globalStore.getState>;
export type AppDispatch = typeof globalStore.dispatch;
