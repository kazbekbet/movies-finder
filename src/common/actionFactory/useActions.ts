import { useDispatch } from 'react-redux';
import { ActionsFactory } from './actionFactory';

/**
 * Простой хук, возвращающий экшены без необходимости передавать useDispatch из компонента.
 *
 * @param {Function} selector - Селектор возвращаемого объекта.
 * */
export const useActions = <T extends ActionsFactory>(selector: (actions: ActionsFactory) => T[keyof T]) => {
    return selector(new ActionsFactory(useDispatch()));
};
