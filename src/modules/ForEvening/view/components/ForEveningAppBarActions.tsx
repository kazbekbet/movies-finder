import React from 'react';
import { IconButton } from 'react-native-paper';
import { useAppSelector } from '../../../../store/hooks';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../../router/routerPaths';

export const ForEveningAppBarActions: React.FC = () => {
    const {history} = useAppSelector(state => state.forEvening);

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate(RouterPaths.FOR_EVENING_HISTORY);
    };

    return <IconButton icon='history' disabled={isEmpty(history)} color={'#fff'} size={24} onPress={handlePress}/>;
};
