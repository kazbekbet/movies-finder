import React, { useEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { useActions } from '../../../common/actionFactory/useActions';
import { FavoritesMoviesActions } from '../actions/FavoritesMoviesActions';
import { useAppSelector } from '../../../store/hooks';
import { FlatList, StyleSheet, View } from 'react-native';
import { MovieCard } from '../../../common/components/MovieCard/MovieCard';
import { isFulfilled, isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { Paragraph } from 'react-native-paper';
import { RouterPaths } from '../../../router/routerPaths';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка избранных фильмов. */
export const FavoritesMovies: React.FC<IOwnProps> = ({ navigation }) => {
    const { status, movies } = useAppSelector(state => state.favoritesMovies);
    const actions = useActions(actions => actions.favoritesMovies) as FavoritesMoviesActions;

    useEffect(() => {
        actions.getFavoritesMovies();
    }, []);

    /** Переход к детальной информации о фильме. */
    const handlePress = ({ id, title }: { id: number; title: string }) => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    return (
        <View style={styles.container}>
            {isPending(status) && <Spinner setDefaultPaddingTop />}
            {!isPending(status) && !movies && (
                <Paragraph style={styles.textContent}>Список избранных фильмов пуст</Paragraph>
            )}
            {isFulfilled(status) && movies && (
                <FlatList
                    data={movies}
                    keyExtractor={movie => movie.id.toString()}
                    renderItem={movie => (
                        <MovieCard
                            title={movie.item.title}
                            shortMovieInfo={movie.item}
                            id={movie.item.id}
                            description={movie.item.overview}
                            posterPath={movie.item.backdrop_path}
                            onPress={handlePress.bind(null, { id: movie.item.id, title: movie.item.title })}
                            voteAverage={movie.item.vote_average}
                            releaseDate={movie.item.release_date}
                        />
                    )}
                />
            )}
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
