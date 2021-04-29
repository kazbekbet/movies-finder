import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { themeConfig } from '../common/theme/themeConfig';
import { RouterPaths } from './routerPaths';
import { MovieInfo } from '../modules/MovieInfo/view/MovieInfo';
import { MainTabRoutes } from './MainTabRoutes';

const Stack = createStackNavigator();

/** Роутер приложения. */
export const Router: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: themeConfig.colors.primary,
                    },
                    headerTintColor: '#fff',
                }}
            >
                <Stack.Screen name={RouterPaths.DRAWER} component={MainTabRoutes} />
                <Stack.Screen name={RouterPaths.MOVIE_INFO} component={MovieInfo} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
