import { useDispatch } from 'react-redux';
import { ActionsFactory } from './actionFactory';

/**
 * Простой хук, возвращающий экшены без необходимости передавать useDispatch из компонента.
 *
 * @param {keyof ActionsFactory} type - Наименование геттера.
 * */
export const useActions = (type: keyof ActionsFactory) => new ActionsFactory(useDispatch())[type];
