import { RouterPaths } from './routerPaths';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Модель для навигации в компонентах.
 * Используется для наследования в модели пропсов компонента.
 * */
export interface NavigationModel<T extends RouterPaths> {
    navigation: StackNavigationProp<RootStackParamList, T>;
    route: RouteProp<RootStackParamList, T>;
}

export type RootStackParamList = {
    [RouterPaths.MOVIES_LIST]: undefined;
    [RouterPaths.MOVIE_INFO]: { id: number };
};
