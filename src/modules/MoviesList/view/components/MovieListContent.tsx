import React from 'react';
import { IMovieListResponse } from '../../store/models';
import { PromiseStatuses } from '../../../../common/enums/asyncActionStatuses';
import { isPending } from '../../../../common/statusCheckers/asyncStatusCheckers';
import { MovieCard } from '../../../../common/components/MovieCard/MovieCard';

interface IOwnProps {
    movies: IMovieListResponse | null;
    status: PromiseStatuses;
}

export const MovieListContent: React.FC<IOwnProps> = ({ movies, status }) => {
    return (
        <>
            {movies?.results &&
                !isPending(status) &&
                movies.results.map(movie => (
                    <MovieCard
                        key={movie.id}
                        title={movie.title}
                        description={movie.overview}
                        posterPath={movie.backdrop_path}
                    />
                ))}
        </>
    );
};
