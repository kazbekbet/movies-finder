import React, { useContext, useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { SortTypes } from '../../../common/enums/sortTypes';
import { isPending } from '../../../common/statusCheckers/asyncStatusCheckers';
import { MovieListContent } from './components/MovieListContent';
import { MovieListPagination } from './components/MovieListPagination';
import { ChangePageTypes } from '../actions/types';
import { useAppSelector } from '../../../store/hooks';
import { NavigationModel } from '../../../router/types';
import { LoadingSpinner } from '../../../common/components/Spinner/LoadingSpinner';
import { FetchedDataChecker } from '../../../common/statusCheckers/FetchedDataChecker';
import { ActionsContext } from '../../../common/components/CommonEffectWrapper/CommonEffectWrapper';
import { ActionsFactory } from '../../../common/actionFactory/actionFactory';

/** Модель свойств компонента. */
interface IOwnProps extends NavigationModel {}

/** Компонент списка фильмов. */
export const MoviesList: React.FC<IOwnProps> = ({}) => {
    const { movies, status, page, sortBy } = useAppSelector(state => state.moviesList);
    const { moviesListActions, favoritesMoviesActions } = useContext(ActionsContext) as ActionsFactory;

    useEffect(() => {
        if (sortBy) {
            getMovieList(sortBy);
        } else getMovieList();
    }, [page]);

    useEffect(() => {
        favoritesMoviesActions.getFavoritesMovies();
    }, []);

    /** Получение списка фильмов. */
    const getMovieList = async (sortBy: SortTypes = SortTypes.POPULARITY) =>
        await moviesListActions.getMoviesList(sortBy, page);

    /** Изменение страницы списка. */
    const handleChangePage = (changeType: ChangePageTypes) => () => {
        moviesListActions.changePage({ type: changeType, currentPage: page });
    };

    return (
        <ScrollView style={styles.container}>
            <LoadingSpinner status={status} />

            <FetchedDataChecker show={Boolean(!isPending(status) && movies?.results)}>
                <MovieListContent movies={movies} status={status} />
            </FetchedDataChecker>

            <FetchedDataChecker show={Boolean(!isPending(status) && movies)}>
                <MovieListPagination
                    currentPage={page}
                    onOpenNextPage={handleChangePage(ChangePageTypes.INCREMENT)}
                    onOpenPreviousPage={handleChangePage(ChangePageTypes.DECREMENT)}
                />
            </FetchedDataChecker>
        </ScrollView>
    );
};

/** Стили. */
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#efefef',
    },
});
