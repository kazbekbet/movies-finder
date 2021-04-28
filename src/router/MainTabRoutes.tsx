import React, { useLayoutEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MoviesList from '../modules/MoviesList/view/MoviesList';
import { themeConfig } from '../common/theme/themeConfig';
import { NavigationModel } from './types';
import { RouterPaths } from './routerPaths';
import { useAppSelector } from '../store/hooks';
import { AppBarFactory } from '../common/appBar/AppBarFactory';
import { FavoritesMovies } from "../modules/FavoritesMovies/view/FavoritesMovies";

const Tab = createMaterialBottomTabNavigator();

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel<RouterPaths.MOVIES_LIST> {}

export const MainTabRoutes: React.FC<IOwnProps> = ({ navigation }) => {
    const { currentRoute } = useAppSelector(state => state.common);

    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        if (currentRoute) {
            navigation.setOptions(AppBarFactory({ route: currentRoute }));
        }
    }, [navigation, currentRoute]);

    return (
        <Tab.Navigator shifting activeColor={themeConfig.colors.primary} barStyle={{ backgroundColor: '#fff' }}>
            <Tab.Screen name='Подборки' options={{ tabBarIcon: 'movie-open-outline' }} component={MoviesList} />
            <Tab.Screen name='Поиск' options={{ tabBarIcon: 'movie-search-outline' }} component={MoviesList} />
            <Tab.Screen
                name='Избранное'
                options={{ tabBarIcon: 'folder-star-multiple-outline' }}
                component={FavoritesMovies}
            />
        </Tab.Navigator>
    );
};
