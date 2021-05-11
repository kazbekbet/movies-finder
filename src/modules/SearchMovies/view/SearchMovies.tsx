import React, { useEffect } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { FlatList, StyleSheet, View } from 'react-native';
import { isFulfilled, isIdle, isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { MovieCard } from '../../../common/components/MovieCard/MovieCard';
import { RouterPaths } from '../../../router/routerPaths';
import { NavigationModel } from '../../../router/types';
import { Caption } from 'react-native-paper';
import { isEmpty } from 'lodash';
import { useActions } from '../../../common/actionFactory/useActions';
import { SearchMoviesActions } from '../actions/actions';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

export const SearchMovies: React.FC<IOwnProps> = React.memo(({ navigation }) => {
    const { query, lastQueryValue, status, movies, page, newPageLoadStatus } = useAppSelector(
        state => state.searchMovies
    );
    const { changePage, loadNewPageData } = useActions(actions => actions.searchMovies) as SearchMoviesActions;

    useEffect(() => {
        if (query) {
            loadNewPageData(query, page);
        }
    }, [page]);

    /** Переход к детальной информации о фильме. */
    const handlePress = ({ id, title }: { id: number; title: string }) => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    /** Обработчик изменения страницы. */
    const handleChangePage = () => {
        if (movies) {
            changePage(page, movies?.total_pages);
        }
    };

    return (
        <View style={styles.container}>
            {isPending(status) && <Spinner setDefaultPaddingTop />}

            {isIdle(status) && !movies && (
                <Caption style={styles.textContent}>Введите название фильма в поле выше.</Caption>
            )}

            {isFulfilled(status) && isEmpty(movies?.results) && (
                <Caption style={styles.textContent}>По запросу "{lastQueryValue}" не найдено результатов.</Caption>
            )}

            {isFulfilled(status) && movies && (
                <>
                    {!isEmpty(movies.results) && (
                        <View style={styles.results}>
                            <Caption>Найдено фильмов: {movies.total_results} </Caption>
                            {isPending(newPageLoadStatus) && <Spinner customSize={24} />}
                        </View>
                    )}
                    <FlatList
                        data={movies.results}
                        keyExtractor={movie => (movie.id + movie.vote_average + movie.vote_count).toString()}
                        onEndReached={handleChangePage}
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
                </>
            )}
        </View>
    );
});

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
    results: {
        paddingVertical: 16,
        paddingHorizontal: 16,
        elevation: 8,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
});
