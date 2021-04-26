import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { AppBar } from '../../../common/components/AppBar/AppBar';
import { SortTypes } from '../../../common/enums/sortTypes';
import { isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { Spinner } from '../../../common/components/Spinner/Spinner';
import { MovieListContent } from './components/MovieListContent';
import { MovieListPagination } from './components/MovieListPagination';
import { ChangePageTypes } from '../actions/types';
import { useAppSelector } from '../../../store/hooks';
import { useActions } from '../../../common/actionFactory/useActions';

/** Компонент списка фильмов. */
export const MoviesList: React.FC = () => {
    const { movies, status, page } = useAppSelector(state => state.moviesList);
    const actions = useActions('moviesList');

    useEffect(() => {
        getMovieList();
    }, [page]);


    const getMovieList = async (sort: SortTypes = SortTypes.REVENUE) => {
        await actions.getMoviesList(sort, page);
    };

    const handleIncrementPage = () => actions.changePage({ type: ChangePageTypes.INCREMENT, currentPage: page });
    const handleDecrementPage = () => actions.changePage({ type: ChangePageTypes.DECREMENT, currentPage: page });

    return (
        <>
            <AppBar title='Список фильмов' subtitle={`По популярности, страница: ${page}`} />
            <ScrollView style={styles.container}>
                {isPending(status) && <Spinner />}
                <MovieListContent movies={movies} status={status} />
                {!isPending(status) && movies && (
                    <MovieListPagination
                        currentPage={page}
                        onOpenNextPage={handleIncrementPage}
                        onOpenPreviousPage={handleDecrementPage}
                    />
                )}
            </ScrollView>
        </>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f8f8f8',
        paddingVertical: 12,
    },
});
