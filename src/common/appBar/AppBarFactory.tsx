import React from 'react';
import { RouterPaths } from '../../router/routerPaths';
import { MovieListAppBarHeader } from '../../modules/MoviesList/view/components/MovieListAppBarHeader';
import { MovieListAppBarActions } from '../../modules/MoviesList/view/components/MovieListAppBarActions';
import { StackNavigationOptions } from '@react-navigation/stack';
import { Text } from "react-native";

interface IOwnProps {
    route: RouterPaths;
}

export const AppBarFactory = ({ route }: IOwnProps): Partial<StackNavigationOptions> => {
    switch (route) {
        case RouterPaths.MOVIES_LIST:
            return {
                headerTitle: () => <MovieListAppBarHeader />,
                headerRight: () => <MovieListAppBarActions />,
            };
        case RouterPaths.FAVORITES_MOVIES:
            return {
                headerTitle: () => <Text>Избранное</Text>
            }
        default:
            return {};
    }
};
