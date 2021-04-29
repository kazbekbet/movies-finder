import React, { useState } from 'react';
import { IconButton } from 'react-native-paper';
import { useActions } from '../../../../common/actionFactory/useActions';
import { FavoritesMoviesActions } from '../../actions/FavoritesMoviesActions';
import { SimpleDialog } from '../../../../common/components/Dialogs/SimpleDialog';
import { useAppSelector } from '../../../../store/hooks';

/** Кнопки бара избранных фильмов. */
export const FavoritesMoviesAppBarActions: React.FC = () => {
    const actions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;
    const { movies } = useAppSelector(state => state.favoritesMovies);
    const [showDialog, setShowDialog] = useState(false);

    const handleShowDialog = () => setShowDialog(true);
    const handleCloseDialog = () => setShowDialog(false);

    const handlePress = async () => {
        await actions.deleteAllData();
        await actions.getFavoritesMovies();
        await handleCloseDialog();
    };

    return (
        <>
            <IconButton
                icon='trash-can-outline'
                disabled={!movies}
                color={'#fff'}
                size={24}
                onPress={handleShowDialog}
            />
            {showDialog && (
                <SimpleDialog
                    title={'Очистка избранного'}
                    description={'Вы уверены, что желаете удалить все избранные фильмы из списка?'}
                    confirmText={'Подтвердить'}
                    cancelText={'Отмена'}
                    onConfirm={handlePress}
                    onDismiss={handleCloseDialog}
                />
            )}
        </>
    );
};
