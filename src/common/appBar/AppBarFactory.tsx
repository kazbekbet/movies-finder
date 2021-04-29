import React from 'react';
import { BottomBarRouterPaths } from '../../router/routerPaths';
import { MovieListAppBarHeader } from '../../modules/MoviesList/view/components/MovieListAppBarHeader';
import { MovieListAppBarActions } from '../../modules/MoviesList/view/components/MovieListAppBarActions';
import { StackNavigationOptions } from '@react-navigation/stack';
import { FavoritesMoviesAppBarHeader } from '../../modules/FavoritesMovies/view/components/FavoritesMoviesAppBarHeader';
import { SearchMoviesAppBarHeader } from '../../modules/SearchMovies/view/components/SearchMoviesAppBarHeader';

export const AppBarFactory = (route: string): Partial<StackNavigationOptions> => {
    switch (route) {
        case BottomBarRouterPaths.MOVIES_LIST:
            return {
                headerTitle: () => <MovieListAppBarHeader />,
                headerRight: () => <MovieListAppBarActions />,
            };
        case BottomBarRouterPaths.SEARCH_MOVIES:
            return {
                headerTitle: () => <SearchMoviesAppBarHeader />,
                headerRight: undefined,
            };
        case BottomBarRouterPaths.FAVORITES_MOVIES:
            return {
                headerTitle: () => <FavoritesMoviesAppBarHeader />,
                headerRight: undefined,
            };
        default:
            return {};
    }
};
