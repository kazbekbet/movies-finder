import { RouterPaths } from './routerPaths';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

/**
 * Модель для навигации в компонентах.
 * Используется для наследования в модели пропсов компонента.
 *
 * @prop {StackNavigationProp<RootStackParamList, keyof RootStackParamList>} navigation.
 * @prop {RouteProp<RootStackParamList, keyof RootStackParamList>} route
 * */
export interface NavigationModel {
    navigation: StackNavigationProp<RootStackParamList, keyof RootStackParamList>;
    route: RouteProp<RootStackParamList, keyof RootStackParamList>;
}

/** Типизация параметров роутинга. */
export type RootStackParamList = {
    [RouterPaths.MOVIES_LIST]: undefined;
    [RouterPaths.MOVIE_INFO]: { id: number; title: string };
    [RouterPaths.FAVORITES_MOVIES]: undefined;
};
