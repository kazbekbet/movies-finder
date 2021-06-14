import { useDispatch } from 'react-redux';
import { ActionsFactory } from './actionFactory';

/**
 * Простой хук, возвращающий экшены без необходимости передавать useDispatch из компонента.
 *
 * @param {Function} selector - Селектор возвращаемого объекта.
 * @return {T} - Возвращает объект запрашиваемых по селектору экшенов.
 * */
export function useActions<T>(selector: (actions: ActionsFactory) => T): T {
    return selector(new ActionsFactory(useDispatch()));
}
