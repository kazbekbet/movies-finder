import React from 'react';
import { IMovieListResponse } from '../../store/models';
import { PromiseStatuses } from '../../../../common/enums/asyncActionStatuses';
import { MovieCard } from '../../../../common/components/MovieCard/MovieCard';
import { useNavigation } from '@react-navigation/native';
import { RouterPaths } from '../../../../router/routerPaths';

interface IOwnProps {
    movies: IMovieListResponse | null;
    status: PromiseStatuses;
}

export const MovieListContent: React.FC<IOwnProps> = ({ movies, status }) => {
    const navigation = useNavigation();
    /** Переход к детальной информации о фильме. */
    const handlePress = ({ id, title }: { id: number; title: string }) => () => {
        navigation.navigate(RouterPaths.MOVIE_INFO, {
            id,
            title,
        });
    };

    return (
        <>
            {movies?.results &&
                movies.results.map(movie => (
                    <MovieCard
                        onPress={handlePress({ id: movie.id, title: movie.title })}
                        shortMovieInfo={movie}
                        id={movie.id}
                        key={movie.id}
                        title={movie.title}
                        description={movie.overview}
                        posterPath={movie.backdrop_path}
                        voteAverage={movie.vote_average}
                        releaseDate={movie.release_date}
                    />
                ))}
        </>
    );
};
