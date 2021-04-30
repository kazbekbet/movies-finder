import AsyncStorage from '@react-native-async-storage/async-storage';
import { ELocalStorage } from '../enums/localStorage';
import { cloneDeep, isEqual } from 'lodash';

/** Общий класс работы с локальным хранилищем. */
export class LocalStorage {
    /**
     * Получение данных локального стора.
     *
     * @param {ELocalStorage} key - Ключ, по которому необходимо произвести запись.
     * */
    public getData = async <T>(key: ELocalStorage) => {
        const storedDataValue = await AsyncStorage.getItem(key);

        if (storedDataValue) {
            return JSON.parse(storedDataValue) as T;
        }
        return null;
    };

    /**
     * Запись элемента в локальный стор (массив).
     *
     * @param item - Записываемый элемент.
     * @param {ELocalStorage} key - Ключ, по которому необходимо произвести запись.
     * */
    public setItemToArray = async <T>(item: T, key: ELocalStorage) => {
        const storedData = await this.getData<T[]>(key);

        if (item) {
            if (storedData) {
                const foundItem = storedData.find(stored => isEqual(stored, item));
                if (!foundItem) {
                    const mergedData = [item].concat(storedData);
                    await AsyncStorage.setItem(key, JSON.stringify(mergedData));
                }
            } else {
                await AsyncStorage.setItem(key, JSON.stringify([item]));
            }
        }
    };

    /**
     * Удаление элемента из локального стора (массив).
     *
     * @param {ELocalStorage} key - Ключ, по которому необходимо произвести запись.
     * @param {Function} condition - Условие поиска.
     * */
    public removeItemFromArray = async <T>(key: ELocalStorage, condition: (el: T) => void) => {
        const storedData = await this.getData<T[]>(key);
        if (storedData) {
            const foundElement = storedData.findIndex(condition);
            if (foundElement !== -1) {
                const newData = cloneDeep(storedData);
                newData.splice(foundElement, 1);
                await this.setNewStoredData(newData, key);
            }
        }
    };

    /**
     * Перезапись всех данных по ключу.
     *
     * @param newData - Новые данные на запись.
     * @param {ELocalStorage} key - Ключ, по которому необходимо произвести запись.
     * */
    private setNewStoredData = async <T>(newData: T, key: ELocalStorage) => {
        await this.deleteAllDataByKey(key);
        await AsyncStorage.setItem(key, JSON.stringify(newData));
    };

    /**
     * Удаление всех данных по ключу.
     *
     * @param {ELocalStorage} key - Ключ, по которому необходимо произвести запись.
     * */
    public deleteAllDataByKey = async (key: ELocalStorage) => {
        await AsyncStorage.removeItem(key);
    };
}
