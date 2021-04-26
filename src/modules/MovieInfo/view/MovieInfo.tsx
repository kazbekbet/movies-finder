import React, { useLayoutEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { RouterPaths } from '../../../router/routerPaths';
import { Text } from 'react-native';
import { MovieInfoAppBarHeader } from './components/MovieInfoAppBarHeader';

interface IOwnProps extends NavigationModel<RouterPaths.MOVIE_INFO> {}

export const MovieInfo: React.FC<IOwnProps> = ({ route, navigation }) => {
    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <MovieInfoAppBarHeader title={route.params.title}/>,
        });
    }, [navigation]);

    return <Text>Фильм: {route.params.id}</Text>;
};
