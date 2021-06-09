import React from 'react';
import { BottomBarRouterPaths } from '../../router/routerPaths';
import { MovieListAppBarHeader } from '../../modules/MoviesList/view/components/MovieListAppBarHeader';
import { MovieListAppBarActions } from '../../modules/MoviesList/view/components/MovieListAppBarActions';
import { StackNavigationOptions } from '@react-navigation/stack';
import { FavoritesMoviesAppBarHeader } from '../../modules/FavoritesMovies/view/components/FavoritesMoviesAppBarHeader';
import { SearchMoviesAppBarHeader } from '../../modules/SearchMovies/view/components/SearchMoviesAppBarHeader';
import { FavoritesMoviesAppBarActions } from '../../modules/FavoritesMovies/view/components/FavoritesMoviesAppBarActions';
import { ForEveningAppBarHeader } from '../../modules/ForEvening/view/components/ForEveningAppBarHeader';
import { ForEveningAppBarActions } from '../../modules/ForEvening/view/components/ForEveningAppBarActions';

/** Фабрика, возвращающая верхний бар для контейнерного компонента. */
export const AppBarFactory = (route: string): Partial<StackNavigationOptions> => {
    switch (route) {
        case BottomBarRouterPaths.MOVIES_LIST:
            return {
                headerTitle: () => <MovieListAppBarHeader />,
                headerRight: () => <MovieListAppBarActions />,
            };
        case BottomBarRouterPaths.FOR_EVENING:
            return {
                headerTitle: () => <ForEveningAppBarHeader />,
                headerRight: () => <ForEveningAppBarActions />,
            };
        case BottomBarRouterPaths.SEARCH_MOVIES:
            return {
                headerTitle: () => <SearchMoviesAppBarHeader />,
                headerRight: undefined,
            };
        case BottomBarRouterPaths.FAVORITES_MOVIES:
            return {
                headerTitle: () => <FavoritesMoviesAppBarHeader />,
                headerRight: () => <FavoritesMoviesAppBarActions />,
            };
        default:
            return {};
    }
};
