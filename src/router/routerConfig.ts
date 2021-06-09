import React from 'react';
import { RouterPaths } from './routerPaths';
import { MainTabRoutes } from './MainTabRoutes';
import { MovieInfo } from '../modules/MovieInfo/view/MovieInfo';
import { ForEveningHistory } from '../modules/ForEvening/view/ForEveningHistory';

/** Модель списка обычных экранов приложения. */
interface IStackScreensList {
    count: number;
    name: RouterPaths;
    component: React.ComponentType<any>;
}

/** Список обычных экранов приложения. */
export const stackScreensList: IStackScreensList[] = [
    { count: 1, name: RouterPaths.DRAWER, component: MainTabRoutes },
    { count: 2, name: RouterPaths.MOVIE_INFO, component: MovieInfo },
    { count: 3, name: RouterPaths.FOR_EVENING_HISTORY, component: ForEveningHistory },
];
