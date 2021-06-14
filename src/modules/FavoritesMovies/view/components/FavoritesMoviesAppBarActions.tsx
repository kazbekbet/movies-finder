import React, { useContext, useState } from 'react';
import { IconButton } from 'react-native-paper';
import { SimpleDialog } from '../../../../common/components/Dialogs/SimpleDialog';
import { useAppSelector } from '../../../../store/hooks';
import { ToastAndroid } from 'react-native';
import { isEmpty, isNull } from 'lodash';
import { ActionsContext } from '../../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../../common/actionFactory/actionFactory';

/** Кнопки бара избранных фильмов. */
export const FavoritesMoviesAppBarActions: React.FC = () => {
    const { favoritesMoviesActions } = useContext(ActionsContext) as ActionsFactory;
    const { movies } = useAppSelector(state => state.favoritesMovies);
    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const handlePress = async () => {
        await handleCloseDialog();
        await favoritesMoviesActions.deleteAllData();
        await favoritesMoviesActions.getFavoritesMovies();
        await ToastAndroid.show('Список избранных очищен', ToastAndroid.SHORT);
    };

    return (
        <>
            <IconButton
                icon='trash-can-outline'
                disabled={isEmpty(movies) || isNull(movies)}
                color={'#fff'}
                size={24}
                onPress={handleShowDialog}
            />
            <SimpleDialog
                isVisible={showDialog}
                title={'Очистка избранного'}
                description={'Вы уверены, что желаете удалить все избранные фильмы из списка?'}
                confirmText={'Подтвердить'}
                cancelText={'Отмена'}
                onConfirm={handlePress}
                onDismiss={handleCloseDialog}
            />
        </>
    );
};
