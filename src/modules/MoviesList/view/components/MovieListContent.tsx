import React, { useCallback } from 'react';
import { IMovieListResponse } from '../../store/models';
import { PromiseStatuses } from '../../../../common/enums/asyncActionStatuses';
import { MovieCard } from '../../../../common/components/MovieCard/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../../router/routerPaths';
import { Nullable } from '../../../../common/models/additional';
import { FlatList } from 'react-native';

interface IOwnProps {
    movies: Nullable<IMovieListResponse>;
    status: PromiseStatuses;
}

/** Контент списка фильмов. */
export const MovieListContent: React.FC<IOwnProps> = ({ movies }) => {
    const navigation = useNavigation();
    /** Переход к детальной информации о фильме. */
    const handleNavigate = ({ id, title }: { id: number; title: string }) => () => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    /** Обработчик нажатия на карточку фильма. */
    const handlePress = useCallback(handleNavigate, []);

    return (
        <>
            {movies?.results && (
                <FlatList
                    data={movies.results}
                    keyExtractor={movie => (movie.id + movie.vote_average + movie.vote_count).toString()}
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
        </>
    );
};
