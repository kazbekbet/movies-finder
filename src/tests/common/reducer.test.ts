import { globalStore } from '../../store/rootReducer';
import { clearError, setError } from '../../common/store/commonReducer';

describe('Common reducer test', () => {
    const getCurrentState = () => globalStore.getState().common;
    const dispatch = globalStore.dispatch;

    const initialState = {
        isError: false,
        errorText: '',
        currentRoute: null,
    };

    test('Should be equal initialState', () => {
        const state = globalStore.getState().common;

        expect(state).toEqual(initialState);
    });

    test('Should set error', () => {
        const errorMessage = 'Test Message';
        dispatch(setError(errorMessage));
        const state = getCurrentState();

        expect(state).toEqual({ ...initialState, isError: true, errorText: errorMessage });
    });

    test('Should clear error value', () => {
        dispatch(clearError());
        const state = globalStore.getState().common;

        expect(state).toEqual(initialState);
    });
});
