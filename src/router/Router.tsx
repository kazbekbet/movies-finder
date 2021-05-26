import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { themeConfig } from '../common/theme/themeConfig';
import { RouterPaths } from './routerPaths';
import { MovieInfo } from '../modules/MovieInfo/view/MovieInfo';
import { MainTabRoutes } from './MainTabRoutes';
import { stackScreensList } from './routerConfig';

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
                {stackScreensList.map(item => (
                    <Stack.Screen key={item.count} name={item.name} component={item.component} />
                ))}
            </Stack.Navigator>
        </NavigationContainer>
    );
};
