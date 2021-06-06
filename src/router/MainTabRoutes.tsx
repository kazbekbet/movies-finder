import React, { useLayoutEffect } from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MoviesList } from '../modules/MoviesList/view/MoviesList';
import { themeConfig } from '../common/theme/themeConfig';
import { NavigationModel } from './types';
import { BottomBarRouterPaths } from './routerPaths';
import { FavoritesMovies } from '../modules/FavoritesMovies/view/FavoritesMovies';
import { AppBarFactory } from '../common/appBar/AppBarFactory';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { SearchMovies } from '../modules/SearchMovies/view/SearchMovies';
import { ForEvening } from "../modules/ForEvening/view/ForEvening";

const Tab = createMaterialBottomTabNavigator();

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

export const MainTabRoutes: React.FC<IOwnProps> = ({ route, navigation }) => {
    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? BottomBarRouterPaths.MOVIES_LIST;
        navigation.setOptions(AppBarFactory(routeName));
    }, [navigation, route]);

    return (
        <Tab.Navigator
            initialRouteName={BottomBarRouterPaths.MOVIES_LIST}
            shifting
            activeColor={themeConfig.colors.primary}
            barStyle={{ backgroundColor: '#fff' }}
        >
            <Tab.Screen
                name={BottomBarRouterPaths.MOVIES_LIST}
                options={{ tabBarIcon: 'movie-open-outline' }}
                component={MoviesList}
            />
            <Tab.Screen
                name={BottomBarRouterPaths.FOR_EVENING}
                options={{ tabBarIcon: 'weather-night' }}
                component={ForEvening}
            />
            <Tab.Screen
                name={BottomBarRouterPaths.SEARCH_MOVIES}
                options={{ tabBarIcon: 'movie-search-outline' }}
                component={SearchMovies}
            />
            <Tab.Screen
                name={BottomBarRouterPaths.FAVORITES_MOVIES}
                options={{ tabBarIcon: 'folder-star-multiple-outline' }}
                component={FavoritesMovies}
            />
        </Tab.Navigator>
    );
};
