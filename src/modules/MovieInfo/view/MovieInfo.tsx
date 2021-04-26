import React from 'react';
import { NavigationModel } from '../../../router/types';
import { RouterPaths } from '../../../router/routerPaths';
import { Text } from 'react-native';

interface IOwnProps extends NavigationModel<RouterPaths.MOVIE_INFO> {}

export const MovieInfo: React.FC<IOwnProps> = ({ route, navigation }) => {
    return <Text>Фильм: {route.params.id}</Text>;
};
