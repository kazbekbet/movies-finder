import { TypedUseSelectorHook, useSelector } from 'react-redux';
import type { RootState } from './rootReducer';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
