import React, { useLayoutEffect } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import MoviesList from '../modules/MoviesList/view/MoviesList';
import { NavigationModel } from './types';
import { RouterPaths } from './routerPaths';
import { MovieListAppBarHeader } from '../modules/MoviesList/view/components/MovieListAppBarHeader';
import { MovieListAppBarActions } from '../modules/MoviesList/view/components/MovieListAppBarActions';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

const Drawer = createDrawerNavigator();

/** Компонент меню. */
export const NavigationDrawerRoutes: React.FC<IOwnProps> = ({ navigation }) => {
    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MovieListAppBarHeader />,
            headerRight: () => <MovieListAppBarActions />,
        });
    }, [navigation]);

    return (
        <Drawer.Navigator initialRouteName='Home'>
            <Drawer.Screen name={RouterPaths.MOVIES_LIST} key={RouterPaths.MOVIES_LIST} component={MoviesList} />
            <Drawer.Screen name='Notifications' component={MoviesList} />
        </Drawer.Navigator>
    );
};
