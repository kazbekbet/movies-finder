import React, { useEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { useActions } from '../../../common/actionFactory/useActions';
import { FavoritesMoviesActions } from '../actions/FavoritesMoviesActions';
import { useAppSelector } from '../../../store/hooks';
import { isFulfilled, isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { ScrollView, StyleSheet, View } from 'react-native';
import { IconButton, Paragraph } from 'react-native-paper';
import { MovieListContent } from '../../MoviesList/view/components/MovieListContent';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка избранных фильмов. */
export const FavoritesMovies: React.FC<IOwnProps> = ({ route, navigation }) => {
    const { status, movies } = useAppSelector(state => state.favoritesMovies);
    const actions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;

    useEffect(() => {
        actions.getFavoritesMovies();
    }, []);

    return (
        <ScrollView style={styles.container}>
            {isPending(status) && <Spinner />}
            {isFulfilled(status) && movies?.length === 0 && (
                <Paragraph style={styles.textContent}>Список избранных фильмов пуст</Paragraph>
            )}

            <View style={styles.content}>
                <MovieListContent movies={{ results: movies, page: 1 }} status={status} />
            </View>
        </ScrollView>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
        paddingVertical: 12,
    },
    content: {
        marginBottom: 16,
    },
    textContent: {
        textAlign: 'center',
    },
});
