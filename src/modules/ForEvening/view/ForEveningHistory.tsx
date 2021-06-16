import React, { useContext, useLayoutEffect, useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { NavigationModel } from '../../../router/types';
import { AppBarHeader } from '../../../common/components/AppBar/AppBarHeader';
import { FlatList, StyleSheet, View } from 'react-native';
import { isFulfilled, isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { IconButton, Paragraph } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { MovieCard } from '../../../common/components/MovieCard/MovieCard';
import { RouterPaths } from '../../../router/routerPaths';
import { ActionsContext } from '../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../common/actionFactory/actionFactory';
import { SimpleDialog } from '../../../common/components/Dialogs/SimpleDialog';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка сохраненных фильмов из "Фильм на вечер". */
export const ForEveningHistory: React.FC<IOwnProps> = ({ navigation }) => {
    const { historyStatus, history } = useAppSelector(state => state.forEvening);
    const [showConfirmDialog, setShowConfirmDialog] = useState<boolean>(false);

    /** Экшены компонента. */
    const { forEveningActions } = useContext(ActionsContext) as ActionsFactory;
    const { clearHistory } = forEveningActions;

    /** Специальные опции для AppBar. */
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: () => <AppBarHeader title='История поиска' />,
            headerRight: () => <IconButton icon='trash-can-outline' color={'#fff'} size={24} onPress={toggleDialog} />,
        });
    }, [navigation]);

    /** Переход к детальной информации о фильме. */
    const handlePress = ({ id, title }: { id: number; title: string }) => () => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    function toggleDialog() {
        setShowConfirmDialog(prev => !prev);
    }

    async function clearSearchHistory() {
        toggleDialog();
        await clearHistory();
    }

    return (
        <View style={styles.container}>
            {isPending(historyStatus) && <Spinner setDefaultPaddingTop />}
            {!isPending(historyStatus) && isEmpty(history) && (
                <Paragraph style={styles.textContent}>Список истории поиска пуст.</Paragraph>
            )}
            {isFulfilled(historyStatus) && history && (
                <FlatList
                    data={history}
                    keyExtractor={movie => movie.id.toString()}
                    renderItem={movie => (
                        <MovieCard
                            title={movie.item.title}
                            shortMovieInfo={movie.item}
                            id={movie.item.id}
                            description={movie.item.overview}
                            posterPath={movie.item.backdrop_path}
                            onPress={handlePress({ id: movie.item.id, title: movie.item.title })}
                            voteAverage={movie.item.vote_average}
                            releaseDate={movie.item.release_date}
                        />
                    )}
                />
            )}
            <SimpleDialog
                isVisible={showConfirmDialog}
                title={'Очистка истории'}
                description={'Вы уверены, что желаете очистить историю поиска?'}
                onConfirm={clearSearchHistory}
                confirmText={'Подтвердить'}
                onDismiss={toggleDialog}
                cancelText={'Отмена'}
            />
        </View>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
        flex: 1,
    },
    textContent: {
        textAlign: 'center',
        paddingTop: 16,
    },
});
