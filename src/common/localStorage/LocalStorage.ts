import AsyncStorage from '@react-native-async-storage/async-storage';
import { ELocalStorage } from "../enums/localStorage";

export class LocalStorage {
    getData = async <T>(key: ELocalStorage) => {
        const storedDataValue = await AsyncStorage.getItem(key);
        if (storedDataValue) {
            return JSON.parse(storedDataValue) as T;
        } else return null;
    };
}
