import React, { useContext, useEffect } from 'react';
import { NavigationModel } from '../../../router/types';
import { useAppSelector } from '../../../store/hooks';
import { FlatList, StyleSheet, View } from 'react-native';
import { MovieCard } from '../../../common/components/MovieCard/MovieCard';
import { isFulfilled, isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { Paragraph } from 'react-native-paper';
import { isEmpty, isNull } from 'lodash';
import { RouterPaths } from '../../../router/routerPaths';
import { ActionsContext } from '../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../common/actionFactory/actionFactory';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка избранных фильмов. */
export const FavoritesMovies: React.FC<IOwnProps> = ({ navigation }) => {
    const { status, movies } = useAppSelector(state => state.favoritesMovies);
    const { favoritesMoviesActions } = useContext(ActionsContext) as ActionsFactory;

    useEffect(() => {
        favoritesMoviesActions.getFavoritesMovies();
    }, []);

    /** Переход к детальной информации о фильме. */
    const handlePress = ({ id, title }: { id: number; title: string }) => () => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    /** Проверяет, что список избранных фильмов пуст. */
    const checkMoviesListIsEmpty = () => isEmpty(movies) || isNull(movies);

    return (
        <View style={styles.container}>
            {isPending(status) && <Spinner setDefaultPaddingTop />}
            {!isPending(status) && checkMoviesListIsEmpty() && (
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
                            onPress={handlePress({ id: movie.item.id, title: movie.item.title })}
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
