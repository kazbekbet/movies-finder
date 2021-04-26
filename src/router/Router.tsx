import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MoviesList from '../modules/MoviesList/view/MoviesList';
import { themeConfig } from '../common/theme/themeConfig';
import { MovieListAppBarHeader } from '../modules/MoviesList/view/components/MovieListAppBarHeader';
import { RouterPaths } from './routerPaths';
import { MovieInfo } from '../modules/MovieInfo/view/MovieInfo';
import { MovieInfoAppBarHeader } from "../modules/MovieInfo/view/components/MovieInfoAppBarHeader";

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
                <Stack.Screen
                    name={RouterPaths.MOVIES_LIST}
                    options={{ headerTitle: () => <MovieListAppBarHeader /> }}
                    component={MoviesList}
                />
                <Stack.Screen
                    name={RouterPaths.MOVIE_INFO}
                    options={{ headerTitle: () => <MovieInfoAppBarHeader /> }}
                    component={MovieInfo}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
